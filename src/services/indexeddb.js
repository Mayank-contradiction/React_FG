//Function to save data in IndexedDB
export const saveData = (data) => {
    if(window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB) {
        return new Promise(
            function(resolve, reject) {
                let request = window.indexedDB.open("AromaticBar", 1);

                request.onupgradeneeded = e => {
                    const db = request.result, store = db.createObjectStore("CustomerFeedback", { autoIncrement: true });
                    store.createIndex("emailId", "emailId", {unique: true});
                }

                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const tx = db.transaction("CustomerFeedback", "readwrite");
                    const store = tx.objectStore("CustomerFeedback");
                    let objectStoreRequest = store.add(data);
                    objectStoreRequest.onsuccess = e => {
                        resolve();
                    }
                    objectStoreRequest.onerror = e => {
                        reject(e.target.error);
                    }
                }

                request.onerror = (e)=>{
                    console.log("There was an error: " + e.target.error.message);
                }
            }
        )
    }else {
        alert("You browser does not support indexedDB API");
    }
}

//Function to get all data from IndexedDB.
export const getData = () => {
    if(window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB) {
        return new Promise(
            function(resolve) {
                let request = window.indexedDB.open("AromaticBar");

                let dbExists = true;
                request.onupgradeneeded = function (e){
                    e.target.transaction.abort();
                    dbExists = false;
                }

                request.onsuccess = event => {
                    if(dbExists){
                        const db = event.target.result;
                        const store = db.transaction("CustomerFeedback").objectStore("CustomerFeedback")
                        store.getAll().onsuccess = e => {
                            if(e.target.result) {
                                resolve(e.target.result);
                            }
                            else {
                                resolve([])
                            }
                        }
                    }
                }

                request.onerror = (e)=>{
                    console.log("There was an error: " + e.target.error.message);
                }
            }
        )
    }else {
        alert("You browser does not support indexedDB API");
    }
}