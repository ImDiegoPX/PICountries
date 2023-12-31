import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards.component";
import { getAllCountries } from "../../redux/actions/actions";
import NavBar from "../../components/NavBar/NavBar.component";
import Filters from "../../components/Filters/Filters.component";
import Paginado from "../../components/Paginado/Paginado.component";
import style from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries) ?? [];
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;
    const maxPages = Math.ceil((allCountries && allCountries.length) / countriesPerPage) || 1;
  
    useEffect(() => {
      dispatch(getAllCountries());
    }, [dispatch]);
  
    const paginatedCountries = allCountries.slice(
      (currentPage - 1) * countriesPerPage,
      currentPage * countriesPerPage
    );
    const handleFilter = () => {
      setPage(1);
      setCurrentPage(1);
    };
  
    return (
      <div className={style.overlayHome}>
        <NavBar handleFilter={handleFilter}/>
        <Filters setPage={setPage} setCurrentPage={setCurrentPage} handleFilter={handleFilter} />
        <Paginado
          page={page}
          setPage={setPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPages={maxPages}
        />
        <div>
        <Cards allCountries={paginatedCountries} />
        </div>
      </div>
    );
  };
  
  export default Home;