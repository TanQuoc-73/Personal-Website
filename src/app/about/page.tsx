// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        Đây là trang giới thiệu về công ty hoặc cá nhân của bạn. Bạn có thể chia sẻ thông tin, sứ mệnh,
        tầm nhìn hoặc bất kỳ điều gì bạn muốn người dùng biết về bạn.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          Sứ mệnh của chúng tôi là cung cấp sản phẩm và dịch vụ chất lượng nhằm nâng cao cuộc sống của khách hàng.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-gray-600 mb-6">
          Đội ngũ của chúng tôi gồm những chuyên gia tận tâm và giàu kinh nghiệm trong lĩnh vực của mình.
        </p>

        {/* Bạn có thể thêm hình ảnh, danh sách thành viên hoặc thông tin khác */}
      </section>
    </main>
  );
}
