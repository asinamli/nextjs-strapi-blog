"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";

// Tip tanımları - API yanıtına göre güncellendi
type ChildText = {
  type: string;
  text: string;
};

type ParagraphType = {
  type: string;
  children: ChildText[];
};

type AboutData = {
  id: number;
  bio: ParagraphType[] | string;
  skills: string | string[];
  mail: string; // API'de mail olarak geliyor
  image?: string; // Doğrudan URL olarak gelirse
};

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/abouts");
        console.log("About response:", response.data);
        
        // API yanıtından veriyi alıyoruz
        if (response.data && response.data.data && response.data.data.length > 0) {
          // API yanıtını doğrudan kullanıyoruz
          setAboutData(response.data.data[0]);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Yükleniyor durumu
  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400"></div>
        </div>
      </Card>
    );
  }

  // Veri bulunamadı durumu
  if (!aboutData) {
    return (
      <Card>
        <div className="text-center py-10">
          <p className="text-gray-400">Hakkımda bilgileri bulunamadı.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-4">
        {/* Profil resmi varsa göster */}
        {aboutData.image && (
          <div className="flex justify-center mb-6">
            <img 
              src={aboutData.image.startsWith('http') ? aboutData.image : `http://localhost:1337${aboutData.image}`} 
              alt="Profil" 
              className="w-32 h-32 rounded-full border-2 border-gray-700 object-cover"
            />
          </div>
        )}
        
        {/* Biyografi */}
        <div className="mb-4">
          {Array.isArray(aboutData.bio) ? (
            aboutData.bio.map((paragraph, index) => (
              <p key={index} className="mb-3 text-gray-300">
                {paragraph.children && paragraph.children.map((child, childIndex) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </p>
            ))
          ) : (
            <p className="text-gray-300">{aboutData.bio}</p>
          )}
          <p>-strapiden çekilmiştir-</p>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-3">Yeteneklerim</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          {Array.isArray(aboutData.skills) ? (
            aboutData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))
          ) : typeof aboutData.skills === 'string' ? (
            aboutData.skills.split(',').map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))
          ) : (
            <li>Henüz yetenek eklenmemiş</li>
          )}
        </ul>
        
        <h2 className="text-xl font-semibold text-gray-200 mt-6 mb-3">İletişim</h2>
        <p className="text-gray-300">
          Benimle iletişime geçmek için <a href={`mailto:${aboutData.mail}`} className="text-blue-400 hover:text-blue-300">{aboutData.mail || 'e-posta'}</a> gönderebilir veya sosyal medya hesaplarımı kullanabilirsiniz.
        </p>
      </div>
    </Card>
  );
}