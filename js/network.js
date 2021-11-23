function tree (){
    document.getElementById("timeline").style.display="none"
    document.getElementById("network").style.display="inline"
    //variable matkul
    let matkul = ''
    const fetchUsers = async () => {
        try {
            const res = await fetch('https://raw.githubusercontent.com/ftisunpar/data/master/prasyarat.json');
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();
            matkul = data;
            // console.log(matkul);
            process();
        } catch (error) {
            console.log(error);
        }
    }
    

    // create an array with nodes
    var nodes = new vis.DataSet();

    // create an array with edges
    var edges = new vis.DataSet();

    // create a network
    var container = document.getElementById('network');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            shape: 'dot'
        },
        physics: false,
        edges: {
            smooth: false
        },
    };

    // initialize your network!
    var network = new vis.Network(container, data, options);

    // Get data from API
    
    function process() {
        let text = "";
        const horizontal = [];
        for (i = 1; i < 9; i++) {
            nodes.add([{
                id: i, label: "Semester" + i, group: i, x:-50, y: i*150
            }])
            if (i == 8) {

            }
            else {
                edges.add([
                    { from: i, to: i + 1 }
                ])
            }
            horizontal[i] = 0;
        }
        
        for (let i = 0; i < matkul.length; i++) {
            horizontal[matkul[i].semester] += 200; 
            nodes.add([{
                id: matkul[i].kode, label: matkul[i].nama, group: matkul[i].semester, x:horizontal[matkul[i].semester], y: matkul[i].semester*150 
            }])
            if(matkul[i].prasyarat.tempuh.length != 0){
                for (let j = 0; j < matkul[i].prasyarat.tempuh.length; j++){
                    edges.add([
                        { from: matkul[i].kode, to: matkul[i].prasyarat.tempuh[j] }
                    ])
                }
            }
            if(matkul[i].prasyarat.lulus.length != 0){
                for (let j = 0; j < matkul[i].prasyarat.lulus.length; j++){
                    edges.add([
                        { from: matkul[i].kode, to: matkul[i].prasyarat.lulus[j] }
                    ])
                }
            }
            if(matkul[i].prasyarat.bersamaan.length != 0){
                for (let j = 0; j < matkul[i].prasyarat.bersamaan.length; j++){
                    edges.add([
                        { from: matkul[i].kode, to: matkul[i].prasyarat.bersamaan[j] }
                    ])
                }
            }
        }
        // console.log(horizontal);
        // console.log(nodes);
    }
    fetchUsers();
}