function processNetwork (){
    //Untuk mengambil elemen html berdasarkan id
    document.getElementById("timeline").style.display="none"
    document.getElementById("network").style.display="inline"

    //mengambil data kurikulum dari api yang kemudian dimasukkan ke dalam variable matkul
    let matkul = '';
    const fetchUsers = async () => {
        try {
            const res = await fetch('https://raw.githubusercontent.com/ftisunpar/data/master/prasyarat.json');
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();
            matkul = data;
            createNetwork();
        } catch (error) {
            console.log(error);
        }
    }

    // membuat variable nodes dengan tipe data vis.dataset
    var nodes = new vis.DataSet();

    // membuat variable edges dengan tipe data vis.dataset
    var edges = new vis.DataSet();

    //membuat visualisasi dalam bentuk network
    function createNetwork() {
        // Menambahkan node dari semester 1 sampai semester 8 ke dalam variable nodes 
        // beserta garisnya ke dalam variable edges
        const horizontal = [];
        for (i = 1; i < 9; i++) {
            nodes.add([{
                id: i, label: "Semester " + i, group: i, y: i*150
            }])
            if (i != 8) {
                edges.add([
                    { from: i, to: i + 1 }
                ])
            }
            horizontal[i] = 0;
        }
        
        //memasukkan data yang diambil dari API ke dalam variable edges dan nodes
        for (let i = 0; i < matkul.length; i++) {
            //mengatur bentuk node menjadi kotak dan lingkaran untuk membedakan matkul wajib dan pilihan
            let shape=""
            if(matkul[i].wajib){
                shape="box"
            }
            else{
                shape="circle"
            }

            //mengatur jarak tampilan setiap semesternya
            horizontal[matkul[i].semester] += 200;
            //memasukkan data matkul yang diambil dari API ke dalam variable nodes 
            nodes.add([{
                id: matkul[i].kode, label: matkul[i].nama, group: matkul[i].semester, 
                x:horizontal[matkul[i].semester], y: matkul[i].semester*150, shape:shape 
            }])
            
            //meembedakan garis sesuai dengan prasyaratnya
            if(matkul[i].prasyarat.tempuh.length != 0){
                for (let j = 0; j < matkul[i].prasyarat.tempuh.length; j++){
                    edges.add([
                        { from: matkul[i].kode, to: matkul[i].prasyarat.tempuh[j], 
                          arrows: "from"}
                    ])
                }
            }
            if(matkul[i].prasyarat.lulus.length != 0){
                for (let j = 0; j < matkul[i].prasyarat.lulus.length; j++){
                    edges.add([
                        { from: matkul[i].kode, to: matkul[i].prasyarat.lulus[j], 
                          dashes: true }
                    ])
                }
            }
            if(matkul[i].prasyarat.bersamaan.length != 0){
                for (let j = 0; j < matkul[i].prasyarat.bersamaan.length; j++){
                    edges.add([
                        { from: matkul[i].kode, to: matkul[i].prasyarat.bersamaan[j], 
                          arrows: "from", dashes: true }
                    ])
                }
            }
        }
    }
    fetchUsers();

    //mengambil elemen dari html untuk dijadikan tempat visualisasi
    var container = document.getElementById('network');

    //mengatur data yang akan dipakai agar sesuai format visjs
    var data = {
        nodes: nodes,
        edges: edges
    };

    //mengatur opsi tambahan untuk visualisasi
    var options = {
        nodes: {
            margin: 10,
            widthConstraint: {
                maximum: 120,
            },
        },
        physics: false,
        edges: {
            smooth: false
        },
    };

    //memulai visualisasi sesuai dengan data yang telah diatur
    var network = new vis.Network(container, data, options);
}