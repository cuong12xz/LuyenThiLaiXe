import React, { Component } from "react"
import './about.css'
class About extends Component {
    render() {
        if (this.props.data) {
            var name = this.props.data.name

            var bio = this.props.data.bio
            var street = this.props.data.address.street
            var city = this.props.data.address.city
            var state = this.props.data.address.state
            var zip = this.props.data.address.zip
            var phone = this.props.data.phone
            var email = this.props.data.email
            var resumeDownload = this.props.data.resumedownload
        }

        return (
            <div id="about"className="container">
                <div className="row displayIB" >
                    <div className="three columns ab">
                        {/* <img className="profile-pic" src="./hinh.png" alt="Tim Baker Profile Pic" /> */}
                    </div>
                    <div className="nine columns main-col" >
                        <h2>Giới thiệu về phần mềm thi bằng lái xe A1</h2>

                        <p>Ở phần mềm thi bằng lái xe máy này, các bạn sẽ rất dễ dàng thực hiện việc ôn tập của mình và không phải tốn kém quá nhiều thời gian tập trung vào những trang tài liệu nữa. Chỉ cần sở hữu cho mình một chiếc laptop hoặc một chiếc smartphone có thể truy cập mạng là các bạn đã có thể sử dụng phần mềm này rồi.</p>
                        
                           
                                <h2>Lợi ích của phần mềm thi bằng lái xe máy A1</h2>
                                <p>Có thể nói rằng việc ôn thi bằng lái xe luôn là điều khiến rất nhiều người gặp khó khăn bởi số lượng câu hỏi ôn tập quá lớn. Làm cho nhiều bạn lâm vào tình trạng lo lắng, không biết phải xử lý như thế nào là ổn thỏa nhất trong khi ngay thi sắp cận kề ngay trước mắt.</p>
                                <p>Nhưng kể từ khi phần mềm thi bằng lái xe A1 được tạo dựng và được xem là công cụ hỗ trợ đắc lực cho việc thi trắc nghiệm lái xe A1 online.  Chính nhờ phần mềm này đã giúp cho nhiều người hoàn thành trong thời gian rất ngắn trong khi họ chỉ cần bỏ ra một khoảng thời gian từ 15 – 30 phút mỗi ngày.</p>
                                <p>Những năm về trước, ở thời gian này nếu các bạn đang ôn thi bằng lái xe máy thì có nghĩa là hiện tại hằng ngày các bạn sẽ phải thường xuyên cầm trên tay quyển sổ tài liệu ôn thi do Trung Tâm Đào Tạo Lái Xe TP HCM cung cấp. Nhưng năm nay, mọi việc đã thay đổi hoàn toàn nhờ phần mềm thi trực tuyến bằng lái xe A1.</p>
                                <h2>Tiện lợi và tiết kiệm thời gian</h2>
                                <p>Bỏ qua được cái trang tài liệu rườm rà nhưng mang lại rất nhiều lợi ích cho người sử dụng là điểm nổi trội đặc biệt ở phần mềm thi bằng lái xe A1 mà chúng tôi muốn giới thiệu cho bạn.</p>
                                <p>Ngoài việc giúp các học viên có thể ôn tập được các câu hỏi một cách dễ dàng thông qua một chiếc điện thoại hoặc laptop có thể truy cập mạng internet, phần mềm thi bằng lái xe máy A1 còn có khả năng giúp các bạn thực hiện bài thi trắc nghiệm lái xe a1 online dưới dạng hình thức thi thử rất tiện lợi cùng khả năng chấm điểm vô cùng chính xác.</p>
                                Phần mềm thi bằng lái xe máy A1 mới nhất này được lập trình trên nền tảng Website nên có thiết kế gọn nhẹ thích hợp cho mọi loại phương tiện. Cho phép người truy cập chỉ cần mất một ít dung lượng 3G/4G hoặc Wifi là có thể truy cập nhanh chóng và thực hiện việc tập thi bằng lái xe trên máy tính hoặc Smartphone.
                                <h2>Tải phần mềm thi bằng lái xe A1 như thế nào?</h2>
                                <p>Cũng như đã giới thiệu ở trên, hiện tại phần mềm thi bằng lái xe máy đã được nhân viên của chúng tôi lập trình sẵn trên Website này. Vì thế các bạn chỉ cần truy cập trực tiếp và sử dụng bình thường không cần tải về.</p>
                                <p>Nếu muốn lưu phần mềm thi bằng lái A1 này lại thì các bạn có thể sử dụng công cụ Bookmark trên trình duyệt Chrome hoặc điện thoại để note lại. Mỗi khi nào cần dùng là mở trình duyệt và nhấn vào để truy cập nhanh hơn.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default About
