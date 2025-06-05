import { NavLink } from "react-router-dom";
const Home = () => <section className="relative h-full flex items-center">
    <img src="/public/offer-bg.jpg" srcSet="/public/offer-bg@2x.jpg, 2x" alt="Yelow camper near the lake" className="absolute inset-0 size-full object-cover -z-20" />
    <div className="absolute inset-0 size-full object-cover -z-10 bg-black/20"></div>
    <div className="container font-semibold text-theme-inputs leading-8">
        <h1 className="text-5xl mb-4">Campers of your dreams</h1>
        <p className="text-2xl mb-10">You can find everything you want in our catalog</p>
        <NavLink className="py-4 px-14 rounded-full font-medium text-white bg-theme-btn hover:bg-theme-btn-hover" to="/catalog">View Now</NavLink>
    </div>
</section>

export default Home;