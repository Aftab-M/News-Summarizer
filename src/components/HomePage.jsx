import '../index.css'
import MainPage from './mainpage';

function HomePage(){
    return(
        <div>
            {/* <p className="text-2xl font-bold underline">Hello World !!</p> */}
            <MainPage user={user}/>
        </div>
    );
}


export default HomePage;