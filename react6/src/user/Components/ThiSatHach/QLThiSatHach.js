import Footer from "../../Layout/Footer";
import NavBar from "../../Layout/NavBar";
import DeThi from "./DeThi";
import ThiSatHach from "./ThiSatHach";



export default function QLThiSatHach({action}) {
    var result
   switch (action) {
       case "a1":
           result = <DeThi />
           break;
        case "chitietdethi":
            result=<ThiSatHach/>
            break
       default:
           break;
   }
  return (
    <>
        {result}
    </>
      
  )
}
