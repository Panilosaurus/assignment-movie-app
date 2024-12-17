import styles from "./Navbar.module.css";


function Navbar(props) {

  // NOTES: Component Navbar perlu menerima 2 function yang akan dipanggil di dalam event handler "onChange" dan "onClick"

  return (
    <section className={styles.navbar}>
      <h3>H8 Movies</h3>
      <div>
        <input type="text" onChange={(event) => {
          // NOTES: Gunakan event handler onChange untuk menerima value dari setiap text yang diinput di dalam tag input ini.
          // Cara untuk mendapatkan valuenya adalah dengan cara mengakses "event.target.value".
          props.onChange(event.target.value)
        }} />
        <button
          onClick={() => {
            // NOTES: Gunakan event handler onClick ini untuk mengsubmit movie yang hendak dicari (Search Movies).
            props.onClick()
          }}
          className={styles.searchBarBtn}>Search</button>
      </div>
    </section>
  )
}


export { Navbar }