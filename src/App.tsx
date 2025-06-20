import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Star, 
  Heart, 
  ShoppingCart,
  Users,
  Truck,
  Shield,
  CheckCircle,
  Search,
  Filter,
  User,
  Bot
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  farmer: string;
  location: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  quality: string;
  defectDescription: string;
  inStock: number;
}

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const products: Product[] = [
  {
    id: 1,
    name: "มะม่วงน้ำดอกไม้",
    farmer: "สวนสมชาย",
    location: "เชียงใหม่",
    price: 120,
    originalPrice: 180,
    image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ผลไม้",
    quality: "เกรด A",
    defectDescription: "รอยขีดข่วนเล็กน้อยที่ผิว รสชาติหวานหอมเต็มที่",
    inStock: 50
  },
  {
    id: 2,
    name: "ข้าวหอมมะลิ",
    farmer: "ฟาร์มครอบครัวนิรันดร์",
    location: "สุรินทร์",
    price: 85,
    originalPrice: 120,
    image: "https://images.pexels.com/photos/33239/rice-terrace-vietnam-agriculture.jpg?auto=compress&cs=tinysrgb&w=400",
    category: "ข้าว",
    quality: "พรีเมียม",
    defectDescription: "เมล็ดข้าวขนาดไม่สม่ำเสมอ คุณค่าทางโภชนาการสูง",
    inStock: 200
  },
  {
    id: 3,
    name: "กล้วยหอม",
    farmer: "สวนมาลี",
    location: "ระยอง",
    price: 45,
    originalPrice: 70,
    image: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ผลไม้",
    quality: "เกรด A",
    defectDescription: "ระดับความสุกไม่สม่ำเสมอ หวานอร่อยเต็มรสชาติ",
    inStock: 100
  },
  {
    id: 4,
    name: "แก้วมังกร",
    farmer: "สวนประเสริฐ",
    location: "นครปฐม",
    price: 95,
    originalPrice: 140,
    image: "https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ผลไม้",
    quality: "พรีเมียม",
    defectDescription: "สีผิวไม่สม่ำเสมอ เนื้อหวานฉ่ำน้ำ",
    inStock: 30
  },
  {
    id: 5,
    name: "ผักกาดขาว",
    farmer: "ฟาร์มผักสด",
    location: "เพชรบุรี",
    price: 25,
    originalPrice: 40,
    image: "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ผักสด",
    quality: "เกรด A",
    defectDescription: "ใบด้านนอกมีรอยกัด สดใหม่ ปลอดสารพิษ",
    inStock: 80
  },
  {
    id: 6,
    name: "ไข่ไก่บ้าน",
    farmer: "ฟาร์มไก่บ้านสุขใส",
    location: "กาญจนบุรี",
    price: 180,
    originalPrice: 220,
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ไข่",
    quality: "พรีเมียม",
    defectDescription: "ขนาดไข่ไม่เท่ากัน แต่สดใหม่ โปรตีนสูง",
    inStock: 120
  },
  {
    id: 7,
    name: "ส้มโอขาวน้ำหวาน",
    farmer: "สวนส้มโอนครชัยศรี",
    location: "นครชัยศรี",
    price: 150,
    originalPrice: 200,
    image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "สินค้านอกฤดูกาล",
    quality: "เกรด A",
    defectDescription: "ผิวไม่เรียบเนียน เนื้อหวานฉ่ำ รสชาติเข้มข้น",
    inStock: 40
  },
  {
    id: 8,
    name: "มะเขือเทศราชินี",
    farmer: "ฟาร์มผักปลอดภัย",
    location: "ลพบุรี",
    price: 35,
    originalPrice: 55,
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "ผักสด",
    quality: "เกรด A",
    defectDescription: "รูปทรงไม่สม่ำเสมอ รสชาติหวานกรอบ",
    inStock: 60
  }
];

const botResponses = {
  greeting: "สวัสดีครับ! ยินดีต้อนรับสู่ Farm2Hand 🌾 ฉันชื่อแอนดี้ จะช่วยแนะนำผลิตภัณฑ์คุณภาพดีจากเกษตรกรโดยตรงให้คุณครับ",
  products: "เรามีผลไม้ ผักสด ข้าว ไข่ และสินค้านอกฤดูกาลคุณภาพสูงจากเกษตรกรทั่วประเทศไทย แม้จะมีความบกพร่องเล็กน้อยทางรูปลักษณ์ แต่คุณภาพและรสชาติยังคงเยี่ยมเหมือนเดิม ราคาถูกกว่าตลาดปกติ 30-40%",
  quality: "ผลิตภัณฑ์ทุกชิ้นผ่านการตรวจสอบคุณภาพเข้มงวด มีความบกพร่องเพียงด้านรูปลักษณ์เท่านั้น เช่น รอยขีดข่วน สีไม่สม่ำเสมอ แต่รสชาติและคุณค่าทางอาหารยังคงสมบูรณ์",
  direct: "เราเชื่อมต่อเกษตรกรกับผู้บริโภคโดยตรง ไม่ผ่านพ่อค้าคนกลาง ทำให้เกษตรกรได้รับผลตอบแทนที่ยุติธรรม และคุณได้ผลิตภัณฑ์คุณภาพในราคาที่ดี",
  support: "เรามีทีมงานคอยดูแลตั้งแต่การสั่งซื้อจนถึงการจัดส่ง มีการรับประกันคุณภาพ และระบบรีวิวจากลูกค้า"
};

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: botResponses.greeting,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories = ['ทั้งหมด', 'ผลไม้', 'ผักสด', 'ข้าว', 'ไข่', 'สินค้านอกฤดูกาล'];
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: chatMessages.length + 1,
        text: newMessage,
        isBot: false,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, userMessage]);

      // Simple bot response logic
      setTimeout(() => {
        let botResponse = "ขอบคุณสำหรับคำถามครับ! ฉันยินดีช่วยเหลือคุณ";
        
        if (newMessage.toLowerCase().includes('product') || newMessage.toLowerCase().includes('ผลิตภัณฑ์')) {
          botResponse = botResponses.products;
        } else if (newMessage.toLowerCase().includes('quality') || newMessage.toLowerCase().includes('คุณภาพ')) {
          botResponse = botResponses.quality;
        } else if (newMessage.toLowerCase().includes('direct') || newMessage.toLowerCase().includes('โดยตรง')) {
          botResponse = botResponses.direct;
        } else if (newMessage.toLowerCase().includes('help') || newMessage.toLowerCase().includes('ช่วย')) {
          botResponse = botResponses.support;
        }

        const botMessage: ChatMessage = {
          id: chatMessages.length + 2,
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        };

        setChatMessages(prev => [...prev, botMessage]);
      }, 1000);

      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5DC' }}>
      {/* Header */}
      <header className="shadow-lg sticky top-0 z-40 border-b border-green-600" style={{ backgroundColor: '#4CAF50' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md">
                <img
                  src="/public/ChatGPT_Image_17_.._2568_10_27_08.png"
                  alt="Farm2Hand Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Farm2Hand</h1>
                <p className="text-xs text-green-100">จากฟาร์มสู่มือคุณ</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1 text-white">
                  <Users className="h-4 w-4" />
                  <span>500+ เกษตรกร</span>
                </div>
                <div className="flex items-center space-x-1 text-white">
                  <Truck className="h-4 w-4" />
                  <span>จัดส่งฟรี</span>
                </div>
                <div className="flex items-center space-x-1 text-white">
                  <Shield className="h-4 w-4" />
                  <span>รับประกันคุณภาพ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative text-white py-20"
        style={{ 
          background: `linear-gradient(135deg, #F5F5DC 0%, #2E7D32 50%, #8D6E63 100%)` 
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            ผลิตภัณฑ์เกษตร<span style={{ color: '#FFEB3B' }}>คุณภาพพรีเมียม</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            จากฟาร์มสู่มือคุณโดยตรง ไม่ผ่านพ่อค้าคนกลาง
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>คุณภาพเยี่ยม</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>ราคาเป็นธรรม</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>สดใหม่ทุกวัน</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#616161' }} />
            <input
              type="text"
              placeholder="ค้นหาผลิตภัณฑ์, เกษตรกร, หรือจังหวัด..."
              className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:border-transparent transition-all"
              style={{ 
                borderColor: '#4CAF50',
                backgroundColor: '#FFFFFF'
              }}
              onFocus={(e) => {
                e.target.style.ringColor = '#4CAF50';
                e.target.style.boxShadow = `0 0 0 2px rgba(76, 175, 80, 0.2)`;
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" style={{ color: '#616161' }} />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all font-medium ${
                    selectedCategory === category
                      ? 'text-white shadow-lg transform scale-105'
                      : 'bg-white border-2 hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category ? '#FFA726' : '#FFFFFF',
                    borderColor: selectedCategory === category ? '#FFA726' : '#4CAF50',
                    color: selectedCategory === category ? '#FFFFFF' : '#2E7D32'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border-2 border-transparent hover:border-opacity-30" style={{ borderColor: '#4CAF50' }}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span 
                    className="text-white px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: '#4CAF50' }}
                  >
                    {product.quality}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div 
                    className="text-white px-2 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: '#FFA726' }}
                  >
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#2E7D32' }}>{product.name}</h3>
                    <p className="text-sm flex items-center" style={{ color: '#616161' }}>
                      <User className="h-4 w-4 mr-1" />
                      {product.farmer} • {product.location}
                    </p>
                  </div>
                  <Heart className="h-6 w-6 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#FFEB3B' }} />
                      ))}
                    </div>
                    <span className="text-sm" style={{ color: '#616161' }}>(4.8)</span>
                  </div>
                  <p 
                    className="text-sm p-2 rounded-lg"
                    style={{ 
                      color: '#8D6E63',
                      backgroundColor: 'rgba(141, 110, 99, 0.1)'
                    }}
                  >
                    <Shield className="h-4 w-4 inline mr-1" />
                    {product.defectDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: '#4CAF50' }}>฿{product.price}</span>
                    <span className="text-sm line-through ml-2" style={{ color: '#616161' }}>฿{product.originalPrice}</span>
                  </div>
                  <span className="text-sm" style={{ color: '#616161' }}>
                    คงเหลือ {product.inStock} {product.category === 'ไข่' ? 'ฟอง' : product.category === 'ข้าว' ? 'กก.' : 'กก.'}
                  </span>
                </div>

                <button 
                  className="w-full text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-medium hover:shadow-lg transform hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, #FFA726 0%, #FF9800 100%)` 
                  }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>เพิ่มลงตะกร้า</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen && (
          <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 mb-4 flex flex-col overflow-hidden border-2" style={{ borderColor: '#4CAF50' }}>
            <div 
              className="text-white p-4 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)` }}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-1 rounded-full">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">แอนดี้ - ผู้ช่วยขาย</h3>
                  <p className="text-xs opacity-90">พร้อมช่วยเหลือคุณ</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'text-gray-800'
                        : 'text-white'
                    }`}
                    style={{
                      backgroundColor: message.isBot ? '#F5F5DC' : '#4CAF50'
                    }}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('th-TH', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-4 border-t" style={{ borderColor: '#4CAF50' }}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="พิมพ์ข้อความ..."
                  className="flex-1 px-3 py-2 border-2 rounded-lg focus:ring-2 focus:border-transparent text-sm transition-all"
                  style={{ 
                    borderColor: '#4CAF50',
                    backgroundColor: '#FFFFFF'
                  }}
                  onFocus={(e) => {
                    e.target.style.ringColor = '#4CAF50';
                    e.target.style.boxShadow = `0 0 0 2px rgba(76, 175, 80, 0.2)`;
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="text-white p-2 rounded-lg transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#FFA726' }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          style={{ background: `linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)` }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: '#2E7D32' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-md">
                  <img
                    src="/public/ChatGPT_Image_17_.._2568_10_27_08.png"
                    alt="Farm2Hand Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold">Farm2Hand</span>
              </div>
              <p className="text-green-100">
                เชื่อมต่อเกษตรกรไทยกับผู้บริโภค ส่งผลิตภัณฑ์คุณภาพดีในราคาเป็นธรรม
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#FFEB3B' }}>ผลิตภัณฑ์</h4>
              <ul className="space-y-2 text-green-100">
                <li>ผลไม้สด</li>
                <li>ผักสด</li>
                <li>ข้าวคุณภาพ</li>
                <li>ไข่สด</li>
                <li>สินค้านอกฤดูกาล</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#FFEB3B' }}>บริการ</h4>
              <ul className="space-y-2 text-green-100">
                <li>จัดส่งฟรี</li>
                <li>รับประกันคุณภาพ</li>
                <li>สนับสนุนเกษตรกร</li>
                <li>ตรวจสอบคุณภาพ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#FFEB3B' }}>ติดต่อเรา</h4>
              <ul className="space-y-2 text-green-100">
                <li>โทร: 02-xxx-xxxx</li>
                <li>อีเมล: info@farm2hand.com</li>
                <li>ไลน์: @farm2hand</li>
                <li>เวลาทำการ: 8:00-20:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-600 mt-8 pt-8 text-center text-green-100">
            <p>&copy; 2024 Farm2Hand. สงวนสิทธิ์ทุกประการ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;