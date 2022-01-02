function processTimeline(){
    //Untuk mengambil elemen html berdasarkan id
    document.getElementById("network").style.display="none"
    document.getElementById("timeline").style.display="inline"

    //mengambil data kurikulum dari api yang kemudian dimasukkan ke dalam variable matkul
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
    
    //membuat visualisasi dalam bentuk timeline
    function createTimeline() {
        //membuat id untuk memisahkan mata kuliah wajib dengan mata kuliah pilihan
        var groups = new vis.DataSet([
          { id: 1, content: "Mata Kuliah Wajib" },
          { id: 2, content: "Mata Kuliah Pilihan" },
        ]);

        //untuk menentukan tahun ajaran
        let tahun=new Date().getFullYear();
        let bulan = new Date().getMonth();
        if(bulan<7){
          tahun-=1
          bulan=7
        }
        else{
          bulan=7
        }

        //untuk menentukan timeline per semesternya
        //semester ganjil = agustus - desember
        //semester genap = januari - juli 
        let semester=[]
        for(i=1;i<=9;i++){
            semester[i]= tahun.toString()+"-"+bulan.toString()+"- 31"
            if(i%2!=0){
              bulan+=5
            }
            else{
              bulan-=5
              tahun+=1
            }
        }

        //mengatur warna setiap semesternya
        var res = [];
        let color=["","semester1","semester2","semester3","semester4","semester5","semester6","semester7","semester8"]
        for (var i = 0; i < matkul.length; i++) {
            //memisahkan matkul wajib dan pilihan 
            let wajib=''
            if(matkul[i].wajib){
              wajib=1;
            }
            else{
              wajib=2;
            }
            //memasukkan data matkul yang diambil dari API ke dalam variable res
            res.push(
              { id: matkul[i].kode, content: matkul[i].nama, editable: false,group:wajib , 
                start: semester[matkul[i].semester],end:semester[matkul[i].semester+1], 
                className: color[matkul[i].semester]  }
            )
        }

        //membuat variable items dengan tipe data vis.dataset yang memiliki data dari variable res
        var items = new vis.DataSet(res);

        //mengambil elemen dari html untuk dijadikan tempat visualisasi
        var container = document.getElementById('timeline');

        //mengatur opsi tambahan untuk visualisasi
        var options = {};

        //memulai visualisasi sesuai dengan data yang telah diatur
        var timeline = new vis.Timeline(container, items,groups, options); 
      }
      fetchUsers();
}