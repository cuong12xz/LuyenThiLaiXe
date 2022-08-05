import Footer from "../../Layout/Footer";
import NavBar from "../../Layout/NavBar";
import DeThi from "./DeThi";
import HocLyThuyet from "./HocLyThuyet";



export default function QLLyThuyet({action}) {
    var result
   switch (action) {
       case "a1":
           result = <DeThi />
           break;
        case "chitietdethi":
            result=<HocLyThuyet/>
            break
       default:
           break;
   }
  return (<>
    
     { result}
     
     </>
  )
}
