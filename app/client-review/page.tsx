"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import eclat from "../assets/images/eclat.png";
import avis from "../assets/images/avis.png";
import FallBeamBackground from "../components/FallBeamBackground";

const ClientFeedbackPage: React.FC = () => {
  
  const [theme, setTheme] = useState("dark")
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);



  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(comment == "" && rating == 0){
      alert("Veuillez fournir au moins un commentaire ou une note avant de soumettre votre avis.");
      return;
    }
    // Ici, tu peux appeler ton API pour envoyer les données
    // console.log({ name, email, comment, rating, image });
    setSubmitted(true);
  };

  return (
    <>
      <Topbar theme={theme} setTheme={setTheme} />
      <main className={`grow ${theme == "dark" ? "bg-linear-to-br from-gray-900 to-gray-800 text-gray-100" : " text-gray-800 "}   min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`} data-theme={theme}>
        <FallBeamBackground lineCount={20} beamColorClass="genuka" />
        <div className={`w-full max-w-xl ${theme == "dark" ? "bg-gray-800/80 border-gray-700/50" : "bg-white/90 "} backdrop-blur-sm rounded-2xl  p-8 border border-gray-200/50 shadow-[0px_5px_20px_rgb(253,152,46,0.5)] hover:translate-y-[-2px] hover:shadow-[0px_10px_30px_rgb(253,152,46,0.7)] transition-all duration-300`}>
          <h1 className={`text-3xl ${theme == "dark" ? "text-white bg-linear-to-r from-primary-500 to-primary-600 " : "text-black bg-linear-to-r from-primary-800 to-primary-900"} font-bold mb-4  bg-clip-text `}>
            Laissez votre avis ✨
          </h1>

          <p className={` ${theme == "dark" ? "text-gray-200" : "text-gray-900"} mb-6 text-sm`}>
            Votre retour nous aide à améliorer nos services et à mieux vous satisfaire.
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Merci pour votre avis !</h2>
              <p className={`${theme == "dark" ? "text-gray-300" : "text-gray-600"}`}>Nous apprécions votre retour.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
             
              {/* Note (étoiles) */}
              <div>
                <span className="block text-sm font-medium mb-1">Note</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(rating == star ? 0 : star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        size={28}
                        className={`transition-colors duration-200 ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Commentaire */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1">Commentaire</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 ${theme == "dark" ? "border-gray-700 text-white bg-gray-700/50" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent   transition-all duration-200`}
                ></textarea>
              </div>

              {/* Upload Image */}
              {/* <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">Joindre une image (optionnel)</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-600 dark:text-gray-300"
                />
              </div> */}

              {/* Submit */}
              <div className="relative">
                <img className="absolute -left-8 -top-5 aspect-auto" src={eclat.src} alt="eclat"/>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-4xl bg-amber-500 text-white font-semibold shadow-xl hover:shadow-3xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Envoyer mon avis
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <img className="hidden md:flex translate-x-2  transition-all duration-400 fixed bottom-4 right-4 w-30 h-30 rounded-xl shadow-lg" src={avis.src} alt="Avis Client" />
      <Footer />
    </>
  );
};

export default ClientFeedbackPage;
