getData = function(data){
    return JSON.parse(localStorage.getItem(data)) || [];
};
setData =  function(key,data){
    return localStorage.setItem(key, JSON.stringify(data));
};

