/*"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

type Blog = {
  id: number;
  documentId: string;
  title: string;
  publishedAt: string;
  content: Array<{
    type: string;
    children: Array<{ type: string; text: string }>;
  }>;
};

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/blogs");
        console.log("API Response:", response.data); // Debug için
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Blog Yazıları</h1>
      {blogs.length === 0 && <p>Blog bulunamadı.</p>}
      
      {blogs.map((blog) => (
        <div key={blog.id} style={{ border: '1px solid #ccc', padding: 15, marginBottom: 15 }}>
          <Link href={`/Blog/${blog.documentId}`}>
            <h2 style={{ color: 'blue', cursor: 'pointer' }}>{blog.title}</h2>
          </Link>
          <p>{new Date(blog.publishedAt).toLocaleDateString('tr-TR')}</p>
        </div>
      ))}
    </div>
  );
}*/


"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// Blog için tip tanımı - API yanıtına göre güncellendi
type Blog = {
  id: number;
  documentId: string;
  title: string;
  publishedat?: string; // lowercase 'at'
  publishedAt: string; // uppercase 'At'
  createdAt: string;
  updatedAt: string;
  content: Array<{
    type: string;
    children: Array<{ type: string; text: string }>;
  }>;
}

export default function BlogList() {
  // Blog yazıları ve yükleniyor durumu için state'ler
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Strapi'den blog yazılarını çekecek fonksiyon
    const fetchBlogs = async () => {
      try {
        // Strapi API'ye istek atıyoruz
        const response = await axios.get("http://localhost:1337/api/blogs");
        console.log("Blog verileri:", response.data);
        
        // API yanıtını doğrudan kullan - API yanıtı zaten beklediğimiz formatta
        if (response.data && response.data.data) {
          setBlogs(response.data.data);
        }
      } catch (error) {     
        console.error("Bloglar yüklenirken hata oluştu:", error);
      } finally {
        // İşlem bitince yükleniyor durumunu kaldır
        setLoading(false);  
      }
    };

    // Sayfa yüklendiğinde verileri çek
    fetchBlogs();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#131313]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Yükleniyor...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
       
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">Blog Yazıları</h1>
          <p className="text-lg text-gray-400">En son yazılarımı keşfedin</p>
        </div>

       
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#1c1c1c] rounded-lg border border-gray-800 p-8">
              <p className="text-gray-400 text-lg">Henüz blog yazısı bulunamadı.</p>
            </div>
          </div>
        )}
        
         <div className="grid gap-6 md:gap-6">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-[#1c1c1c] rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-800">
              <div className="p-6">
                <Link href={`/Blog/${blog.documentId}`} className="group">
                  <h2 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors duration-200 leading-tight">
                    {blog.title}
                  </h2>
                </Link>
                
                <div className="flex items-center text-sm text-gray-400 mb-4">
                   
                  {new Date(blog.publishedAt || blog.publishedat || blog.createdAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                <Link 
                  href={`/Blog/${blog.documentId}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Devamını oku
                  
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
