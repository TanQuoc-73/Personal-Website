import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaPaintBrush, FaServer } from 'react-icons/fa';

// Dữ liệu mẫu cho các kỹ năng, bạn có thể tùy chỉnh
const skills = [
  {
    name: 'Frontend Development',
    icon: <FaCode className="text-4xl text-blue-500 mb-4" />,
    description: 'Xây dựng giao diện người dùng đáp ứng và trực quan với các framework hiện đại như React & Next.js.',
  },
  {
    name: 'Backend Development',
    icon: <FaServer className="text-4xl text-green-500 mb-4" />,
    description: 'Tạo các ứng dụng và API phía máy chủ mạnh mẽ và có khả năng mở rộng.',
  },
  {
    name: 'UI/UX Design',
    icon: <FaPaintBrush className="text-4xl text-purple-500 mb-4" />,
    description: 'Thiết kế giao diện lấy người dùng làm trung tâm và hấp dẫn về mặt hình ảnh.',
  },
];

export default function AboutPage() {
  return (
    <div className="text-gray-800 flex mt-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center mb-24">
          {/* THAY ĐỔI ĐƯỜNG DẪN ẢNH BÊN DƯỚI */}
          <Image
            className="w-40 h-40 rounded-full mx-auto mb-6 object-cover ring-4 ring-indigo-500 shadow-lg"
            src="/images/avatar.jpg"
            alt="Your Name"
            width={160}
            height={160}
          />
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Chào bạn, tôi là Dương Quốc Tần {/* <-- THAY ĐỔI TÊN */}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Một nhà phát triển phần mềm đam mê xây dựng các ứng dụng web đẹp và hữu ích.
          </p>
        </section>

        {/* My Story Section */}
        <section className="mb-24 bg-gray-50 p-8 rounded-lg shadow-sm">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Hành trình của tôi</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Hãy điền vào đây câu chuyện của bạn. Bắt đầu từ đâu? Điều gì đã thôi thúc bạn theo đuổi lập trình? Chia sẻ một vài cột mốc quan trọng trong sự nghiệp hoặc các dự án mà bạn tâm đắc.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Mục tiêu của tôi là không ngừng học hỏi và áp dụng công nghệ mới để tạo ra những sản phẩm có giá trị, giải quyết các vấn đề thực tế.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Kỹ năng của tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
                {skill.icon}
                <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center bg-indigo-600 text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Cùng kết nối nhé!</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Tôi luôn sẵn lòng thảo luận về các cơ hội hợp tác, dự án mới hoặc đơn giản là chia sẻ kiến thức. Đừng ngần ngại liên hệ!
          </p>
          <div className="flex justify-center items-center space-x-6 mb-8">
            <Link href="#" className="hover:text-indigo-200"><FaGithub size={30} /></Link>
            <Link href="#" className="hover:text-indigo-200"><FaLinkedin size={30} /></Link>
            <Link href="#" className="hover:text-indigo-200"><FaTwitter size={30} /></Link>
          </div>
          <Link href="/contact" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300">
            Liên hệ với tôi
          </Link>
        </section>
      </main>
    </div>
  );
}
