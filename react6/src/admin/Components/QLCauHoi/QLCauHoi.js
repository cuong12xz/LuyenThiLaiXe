
import { DanhSachCauHoi } from './DanhSachCauHoi'
import Hai from './Hai'
import SuaCauHoi from './SuaCauHoi'
import ThemCauHoi from './ThemCauHoi'


export default function QLCauHoi({action}) {
    var result
   switch (action) {
       case "them":
           result = <ThemCauHoi />
           break;
        case 'danhsach':
            result = <DanhSachCauHoi />
            break;
        case 'sua':
            result = <SuaCauHoi />
            break;
        case 'hai': 
        result = <Hai/>
        break;
       default:
           break;
   }
  return (
      result
  )
}
