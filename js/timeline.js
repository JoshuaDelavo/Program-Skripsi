function time(){
  document.getElementById("network").style.display="none"
  document.getElementById("timeline").style.display="inline"
  let matkul = ''
  const fetchUsers = async () => {
      try {
          const res = await fetch('https://raw.githubusercontent.com/ftisunpar/data/master/prasyarat.json');
          if (!res.ok) {
              throw new Error(res.status);
          }
          const data = await res.json();
          matkul = data;
          createTimeline(matkul);
      } catch (error) {
          console.log(error);
      }
  }
  
  function createTimeline() {
      var groups = new vis.DataSet([
        { id: 1, content: "Mata Kuliah Wajib" },
        { id: 2, content: "Mata Kuliah Pilihan" },
      ]);

      let yyyy=new Date().getFullYear();
      let mm = new Date().getMonth();
      if(mm<7){
        yyyy-=1
        mm=7
      }
      else{
        mm=7
      }

      let semester=[]
      for(i=1;i<=9;i++){
          semester[i]= yyyy.toString()+"-"+mm.toString()+"- 31"
          if(i%2!=0){
            mm+=5
            console.log(semester[i])
          }
          else{
            mm-=5
            yyyy+=1
            console.log(semester[i])
          }
      }

      var res = [];
      let color=["","red","green","purple","blue","magenta","pink","yellow","orange"]
      for (var i = 0; i < matkul.length; i++) {
          let wajib=''
          if(matkul[i].wajib){
            wajib=1;
          }
          else{
            wajib=2;
          }
          res.push(
            { id: matkul[i].kode, content: matkul[i].nama, editable: false,group:wajib , 
              start: semester[matkul[i].semester],end:semester[matkul[i].semester+1], 
              className: color[matkul[i].semester]  }
          )
      }
      var items = new vis.DataSet(res);
      // DOM element where the Timeline will be attached
      var container = document.getElementById('timeline');

      // Configuration for the Timeline
      var options = {};

      // Create a Timeline
      var timeline = new vis.Timeline(container, items,groups, options); 
    }
    fetchUsers();
}