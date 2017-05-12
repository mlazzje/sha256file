//check if browser supports file api and filereader features
if (window.File && window.FileReader && window.FileList && window.Blob) {
    var input = document.getElementById('file');
    input.onchange = function() {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            // Waiting for correction
            // https://github.com/Caligatio/jsSHA/commit/9fdef17bdb794eaef556b307cafd2b98bf9951f5
            var sha256 = new jsSHA("SHA-256", "ARRAYBUFFER");
            sha256.update(e.target.result);
            console.log(sha256.getHash("HEX"));
            
            // WORKAROUND
            var tx = String.fromCharCode.apply(null, new Uint8Array(e.target.result));
            var shaObj = new jsSHA("SHA-256", "TEXT");
            shaObj.update(tx);
            console.log(shaObj.getHash("HEX"));
            
            document.getElementById('result').innerHTML = shaObj.getHash("HEX");
        }
        reader.readAsArrayBuffer(file);
    }
} else {
    alert('The File APIs are not fully supported in this browser.');
}