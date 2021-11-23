function time(){
    document.getElementById("network").style.display="none"
    document.getElementById("timeline").style.display="inline"
    var items = ''
    let matkul = ''
      const fetchUsers = async () => {
          try {
              const res = await fetch('https://raw.githubusercontent.com/ftisunpar/data/master/prasyarat.json');
              if (!res.ok) {
                  throw new Error(res.status);
              }
              const data = await res.json();
              matkul = data;
              console.log(matkul);
              converter(matkul);
          } catch (error) {
              console.log(error);
          }
      }
    
    function converter(data) {
      console.log(data);
      // Create a DataSet (allows two way data-binding)
      var res = [];
      for (var i = 0; i < data.length; i++) {
        res.push(
          { id: data[i].kode, content: data[i].nama, start: data[i].semester }
        )
      }
      // console.log(res);
      items = new vis.DataSet(res);

      // DOM element where the Timeline will be attached
      var container = document.getElementById('timeline');

      // Configuration for the Timeline
      var options = {};

      // Create a Timeline
      var timeline = new vis.Timeline(container, items, options);
    }
    fetchUsers();
}