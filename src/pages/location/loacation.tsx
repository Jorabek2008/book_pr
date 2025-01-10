import { Footer, Header, YandexMap } from "../../components";

export const Location = () => {
  return (
    <div>
      <Header />
      <div>
        <header className="bg-blue-600 text-white text-center py-4 max-lg:mt-5">
          <h1 className="text-3xl font-bold">Manzilimiz</h1>
        </header>

        <main className="container mx-auto p-6">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Ma'lumotlar
            </h2>
            <div className="mt-4">
              <p className="text-lg">
                <strong className="font-bold">Manzil:</strong> 190200, Angor
                tumani 8-Mart ko'chasi 2-uy.
                <br />
                <strong className="font-bold">Mo'ljal:</strong> Barkamol avlod
                bolalar maktabi
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-600">Aloqa</h3>
              <ul className="list-none space-y-2 mt-2">
                <li>
                  <strong className="font-bold">Telefon:</strong> +998
                  (94)-060-93 00
                </li>
                <li>
                  <strong className="font-bold">Ish vaqti:</strong> Du-Jum 9:00
                  - 18:00, Shan 9:00 - 17:00, Yakshanba yopiq
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-600">
                Murojat uchun
              </h3>
              <ul className="list-none space-y-2 mt-2">
                <li>
                  <strong className="font-bold">Telefon:</strong> +998
                  (91)-584-62 19
                </li>
                <li>
                  <strong className="font-bold">Telefon:</strong> +998
                  (99)-507-36 84
                </li>
                <li>
                  <strong className="font-bold">Email:</strong>{" "}
                  <a
                    href="mailto:angorakmkutubxona@gmail.com"
                    className="text-blue-600"
                  >
                    angorakmkutubxona@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>
        <YandexMap />
      </div>
      <Footer />
    </div>
  );
};
