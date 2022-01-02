//mencetak nomor versi electron ke halaman web

//mengakses objek process.versions node.js yang menjalankan fungsi replaceText
//untuk memasukkan nomor versi ke dalam dokumen html
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

