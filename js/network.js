function processNetwork (){
    document.getElementById("timeline").style.display="none"
    document.getElementById("network").style.display="inline"
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

    // create an array with nodes
    var nodes = new vis.DataSet();

    // create an array with edges
    var edges = new vis.DataSet();

    function createNetwork() {
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
        
        for (let i = 0; i < matkul.length; i++) {
            let shape=""
            if(matkul[i].wajib){
                shape="box"
            }
            else{
                shape="circle"
            }

            horizontal[matkul[i].semester] += 200; 
            nodes.add([{
                id: matkul[i].kode, label: matkul[i].nama, group: matkul[i].semester, 
                x:horizontal[matkul[i].semester], y: matkul[i].semester*150, shape:shape 
            }])

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

    // create a network
    var container = document.getElementById('network');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        nodes: {
            margin: 10,
            widthConstraint: {
                maximum: 110,
            },
        },
        physics: false,
        edges: {
            smooth: false
        },
    };

    // initialize your network!
    var network = new vis.Network(container, data, options);
}