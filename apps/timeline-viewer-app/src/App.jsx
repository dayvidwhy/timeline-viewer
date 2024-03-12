import { Main } from "./partials/Main";
import { Footer } from "./partials/Footer";
import { Header } from "./partials/Header";

const App = () => {
    return (
        <div className="flex flex-col justify-between w-full h-full">
            <div>
                <Header />
                <div className="container mx-auto border-box mt-2">
                    <Main />
                </div>
            </div>
            <Footer />
        </div>
    );
};
    
export default App;
