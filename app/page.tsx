"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import { FaStar } from "react-icons/fa";

const ClientFeedbackPage: React.FC = () => {
  
  const [theme, setTheme] = useState("dark")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Ici, tu peux appeler ton API pour envoyer les données
    // console.log({ name, email, comment, rating, image });
    setSubmitted(true);
  };

  return (
    <>
      <Topbar theme={theme} setTheme={setTheme} />
      <main className={`flex-grow   ${theme == "dark" ? "bg-linear-to-br from-gray-900 to-gray-800 text-gray-100" : " text-gray-800 "}   min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`} data-theme={theme}>
        <div className="w-full max-w-xl bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          <h1 className="text-3xl text-white font-bold mb-4 bg-linear-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Laissez votre avis
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
            Votre retour nous aide à améliorer nos services et à mieux vous satisfaire.
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Merci pour votre avis !</h2>
              <p className="text-gray-600 dark:text-gray-300">Nous apprécions votre retour.</p>
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
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-200"
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
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-4xl bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Envoyer mon avis
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ClientFeedbackPage;
