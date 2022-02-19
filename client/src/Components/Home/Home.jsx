import './Home.css';

const Home = () => {
  return (
    <div id="home">
      <div className="content-box">
        <span className="title">Strona główna panelu zarządzania informacjami</span>
        <span className="bold">W tym panelu znajdziesz: <br /></span>
        <ul>
          <li>Zbiór statystyk z wybranej bazy danych zwizualizowanych w sposób graficzny</li>
          <li>Kalendarz z możliwością planowania wydarzeń przez Drużynę</li>
          <li>Zakładkę z bazą danych z możliwościami CRUD (Create, Read, Update oraz Delete)</li>
        </ul>
      </div>
    </div>
  )
}

export default Home;