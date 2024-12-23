import "./index.css"; 
import Header from "./components/header";
import Todo from "./components/todo";
import Footer from "./components/footer";
import UsageGuide from "./components/sageGuide";
import "./utils/translate/i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/translate/i18n";

export default function Home() {
  return (
    <I18nextProvider i18n={i18n}>
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col md:flex-row md:justify-between h-full w-full px-4 md:space-y-0 ">
        <div className="w-full h-full rounded-lg p-4">

        </div>

        <div className="w-full flex py-4 flex-col">
          <Header />
          <Todo />
          <Footer />
        </div>

        <div className="w-full h-full rounded-lg p-4">
          <UsageGuide />
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
}
