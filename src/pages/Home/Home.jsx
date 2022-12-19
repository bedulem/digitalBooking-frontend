import { Search, SearchCategory, Recomendation } from '../../components/organisms';
import './Home.css'


function Home() {

    return (
        <>
            <Search />
            <SearchCategory />
            <Recomendation />
        </>

    );
}

export default Home;