export interface TranslationSet {
  hero: {
    fullName: string;
  };
  platforms: {
    title: string;
    subtitle: string;
    secLeft: string;
    secRight: string;
    pMeta: { title: string; desc: string };
    pTikTok: { title: string; desc: string };
    pGoogle: { title: string; desc: string };
    pZalo: { title: string; desc: string };
    pApple: { title: string; desc: string };
    cEcom: { title: string; desc: string };
    cUA: { title: string; desc: string };
    cLead: { title: string; desc: string };
    cAware: { title: string; desc: string };
  };
  scope: {
    title: string;
    subtitle: string;
    subHeadline: string;
    autoTitle: string;
    autoSubtitle: string;
    autoList: { title: string; desc: string }[];
    steps: { title: string; desc: string }[];
  };
  tools: {
    title: string;
    subtitle: string;
    cats: {
      traffic: string;
      tracking: string;
      automation: string;
      creative: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formWebsite: string;
    formMsg: string;
    formBtn: string;
    successMsg: string;
    directTel: string;
    directEmail: string;
    directLocation: string;
  };
}

export const translations: Record<"en" | "vi", TranslationSet> = {
  en: {
    hero: {
      fullName: "DO QUANG THANH BINH (HOWARD)"
    },
    platforms: {
      title: "Platforms & Campaign Architecture",
      subtitle: "Multi-platform media buying paired with custom direct-response strategies for direct consumer actions.",
      secLeft: "Where I Deploy Budget",
      secRight: "Strategic Campaign Structures",
      pMeta: {
        title: "Meta Ads Suite",
        desc: "Leveraging custom lookalikes, advantage+ shopping campaigns, and native Lead Forms optimized via Conversions API."
      },
      pTikTok: {
        title: "TikTok Shop & Spark Ads",
        desc: "Harnessing rapid creator video boosts, direct Shop checkout funnels, and real-time affiliate stream boost tracking."
      },
      pGoogle: {
        title: "Google Ads",
        desc: "Designing high-intent Search hierarchies, automated Performance Max formats, and YouTube Action retargeting."
      },
      pZalo: {
        title: "Zalo Ads",
        desc: "Pinpoint domestic targeting to hyper-local demographics using Official Accounts and native mini-app lead capture."
      },
      pApple: {
        title: "Apple Search Ads",
        desc: "Targeting high-intent search queries directly in the iOS App Store to secure high-value app installs."
      },
      cEcom: {
        title: "Retail & E-commerce Sales",
        desc: "Driving bottom-of-funnel purchases, dynamic retargeting, cart abandonment recovery, and recurring subscriber scaling."
      },
      cUA: {
        title: "User Acquisition & App Installs",
        desc: "Scaling app installs with optimized Cost-Per-Install (CPI) while maintaining downstream in-app engagement rates."
      },
      cLead: {
        title: "B2B & B2C Lead Generation",
        desc: "Optimizing landing pages, forms, and validation gates to generate high-quality phone, Zalo, and email leads."
      },
      cAware: {
        title: "High-Impact Awareness & Reach",
        desc: "Amplifying unique brand assets and custom narratives to scale baseline social proof and brand search query volume."
      }
    },
    scope: {
      title: "PERFORMANCE MARKETING SCOPE OF WORK",
      subtitle: "End-to-end capabilities covering strategy, execution, optimization, reporting, and scale.",
      subHeadline: "Core Competencies & Services",
      autoTitle: "Workflow Automation Operations",
      autoSubtitle: "I don't just buy ad impressions. I construct automated systems that capture, validate, route, and report every lead instantly.",
      autoList: [
        {
          title: "Instant Lead Synchronization",
          desc: "Bridging Meta & Google Forms to Telegram/Zalo groups and client CRMs in < 30 seconds via n8n & webhooks."
        },
        {
          title: "Real-time Looker Studio Dashboards",
          desc: "Consolidating TikTok, Google, and Meta APIs into unified transparent reports, with instant summaries sent automatically by email or Telegram."
        },
        {
          title: "Algorithmic Ad Budget Protection",
          desc: "Setting up auto-rules to pause underperforming creative formats and dynamically reallocate funds to high-ROI hours."
        }
      ],
      steps: [
        {
          title: "RESEARCH & STRATEGY",
          desc: "• Market research\n• Competitor analysis\n• Audience research\n• Customer insights\n• Campaign strategy planning"
        },
        {
          title: "MEDIA BUYING",
          desc: "• Meta Ads\n• Google Ads\n• TikTok Ads\n• Amazon Ads\n• Campaign setup and management"
        },
        {
          title: "CREATIVE COLLABORATION",
          desc: "• Ad angle development\n• Creative briefing\n• Hook ideation\n• Performance-driven creatives"
        },
        {
          title: "TRACKING & ANALYTICS",
          desc: "• GA4\n• GTM\n• Conversion API\n• Event tracking\n• Attribution setup"
        },
        {
          title: "OPTIMIZATION & SCALING",
          desc: "• Budget allocation\n• Bid optimization\n• A/B testing\n• Scaling winning campaigns\n• ROAS improvement"
        },
        {
          title: "REPORTING & AUTOMATION",
          desc: "• Performance tracking\n• Looker Studio dashboards\n• Realtime reporting\n• Workflow automations\n• Data-driven insights"
        }
      ]
    },
    tools: {
      title: "Marketing Tech Stack & Tools",
      subtitle: "My technical armory to automate reporting, track attribution, analyze competitors, and configure scalable campaigns.",
      cats: {
        traffic: "Ad Platforms",
        tracking: "Attribution & Data",
        automation: "Automation Services",
        creative: "Design, Edit & Content"
      }
    },
    contact: {
      title: "Initiate Your Campaign Growth Today",
      subtitle: "Have a brand ready to scale, an app seeking installs, or a funnel in need of immediate automation? Let's connect.",
      formName: "Full Name / Business Name",
      formEmail: "Email Address",
      formPhone: "Phone / Zalo Number",
      formWebsite: "Website / Product Link",
      formMsg: "Tell me about your product & monthly budget target",
      formBtn: "Send Growth Proposal Request",
      successMsg: "Thank you! Howard (Do Quang Thanh Binh) has received your request. I will respond within 30 minutes with a customized campaign outline.",
      directTel: "Phone/WhatsApp Hotline",
      directEmail: "Work Email Channel",
      directLocation: "Location Node"
    }
  },
  vi: {
    hero: {
      fullName: "ĐỖ QUANG THANH BÌNH (HOWARD)"
    },
    platforms: {
      title: "Nền tảng & Cấu trúc Chiến dịch",
      subtitle: "Quản lý truyền thông đa kênh kết hợp chặt chẽ với các chiến lược direct-response tối ưu hành động trực tiếp của người tiêu dùng.",
      secLeft: "Kênh Phân bổ Ngân sách",
      secRight: "Cấu trúc Chiến dịch Chiến lược",
      pMeta: {
        title: "Meta Ads Suite",
        desc: "Tận dụng tệp lookalike tùy chỉnh, chiến dịch Advantage+ Shopping và Lead Forms native tối ưu qua Conversions API."
      },
      pTikTok: {
        title: "TikTok Shop & Spark Ads",
        desc: "Khai thác khả năng đẩy mạnh video từ creator, phễu thanh toán trực tiếp qua Shop và theo dõi affiliate theo thời gian thực."
      },
      pGoogle: {
        title: "Google Ads",
        desc: "Thiết kế phân tầng Tìm kiếm ý định cao, định dạng Performance Max tự động và nhắm mục tiêu lại qua YouTube Action."
      },
      pZalo: {
        title: "Zalo Ads",
        desc: "Nhắm mục tiêu địa phương chuẩn xác theo nhân khẩu học bằng Official Accounts và thu thập lead bằng mini-app rập khuôn."
      },
      pApple: {
        title: "Apple Search Ads",
        desc: "Nhắm mục tiêu từ khóa ý định cao trực tiếp trên kho ứng dụng iOS App Store để đoạt tối đa lượng tải app giá trị lớn."
      },
      cEcom: {
        title: "Doanh số Bán lẻ & Thương mại Điện tử",
        desc: "Thúc đẩy các giao dịch phễu dưới cùng, nhắm mục tiêu động, khôi phục giỏ hàng bị bỏ rơi và mở rộng tỷ lệ khách hàng mua lại định kỳ."
      },
      cUA: {
        title: "Thu hút Người dùng & Cài đặt App",
        desc: "Mở rộng số lượt tải app với Chi phí Mỗi Lượt Cài đặt (CPI) tối ưu trong khi vẫn duy trì tỷ lệ tương tác người dùng bên trong ứng dụng."
      },
      cLead: {
        title: "Thu thập Lead B2B & B2C",
        desc: "Tối ưu hóa các landing page, biểu mẫu đăng ký và các cổng xác thực để lấy lead qua số điện thoại, Zalo, và Email chất lượng nhất."
      },
      cAware: {
        title: "Nhận diện Thương hiệu & Tỷ lệ Tiếp cận",
        desc: "Khuếch đại các tài sản thương hiệu độc đáo và thông điệp riêng để gia tăng niềm tin xã hội cốt lõi và lưu lượng tìm kiếm từ khóa thương hiệu."
      }
    },
    scope: {
      title: "PHẠM VI CÔNG VIỆC PERFORMANCE MARKETING",
      subtitle: "Năng lực toàn diện bao gồm chiến lược, triển khai, tối ưu hóa, báo cáo và mở rộng quy mô.",
      subHeadline: "Năng Lực Cốt Lõi & Dịch Vụ",
      autoTitle: "Vận hành Tự động hóa Luồng Công việc",
      autoSubtitle: "Tôi không chỉ mua lượt hiển thị quảng cáo. Tôi xây dựng các hệ thống tự động để lưu trữ, xác thực, phân luồng và thông báo mọi lead ngay lập tức.",
      autoList: [
        {
          title: "Đồng bộ Lead Tức thì",
          desc: "Chuyển tiếp Meta & Google Forms tới các nhóm Telegram/Zalo và CRM của khách hàng trong vòng chưa đầy 30 giây thông qua n8n & webhooks."
        },
        {
          title: "Dashboard Looker Studio Thời gian thực",
          desc: "Tổng hợp dữ liệu API từ TikTok, Google, và Meta thành các báo cáo thống nhất, minh bạch cùng các bản tóm tắt gửi tự động qua email."
        },
        {
          title: "Bảo vệ Ngân sách Quảng cáo bằng Thuật toán",
          desc: "Thiết lập quy tắc tự động để tạm ngưng nhóm sáng tạo kém hiệu quả và phân bổ động dòng tiền sang các khung giờ có ROI cao."
        }
      ],
      steps: [
        {
          title: "NGHIÊN CỨU & CHIẾN LƯỢC",
          desc: "• Nghiên cứu thị trường\n• Phân tích đối thủ\n• Nghiên cứu công chúng mục tiêu\n• Insight khách hàng\n• Lập kế hoạch chiến dịch"
        },
        {
          title: "MEDIA BUYING",
          desc: "• Meta Ads\n• Google Ads\n• TikTok Ads\n• Amazon Ads\n• Thiết lập & quản lý chiến dịch"
        },
        {
          title: "CỘNG TÁC SÁNG TẠO",
          desc: "• Phát triển góc độ quảng cáo (Angles)\n• Briefing sáng tạo\n• Sáng tạo Hook\n• Nội dung quảng cáo hướng hiệu suất"
        },
        {
          title: "ĐO LƯỜNG & PHÂN TÍCH",
          desc: "• GA4\n• GTM\n• Conversion API\n• Theo dõi sự kiện (Event tracking)\n• Thiết lập mô hình phân bổ"
        },
        {
          title: "TỐI ƯU & MỞ RỘNG",
          desc: "• Phân bổ ngân sách\n• Tối ưu giá thầu\n• Thử nghiệm A/B\n• Mở rộng chiến dịch win\n• Cải thiện ROAS"
        },
        {
          title: "BÁO CÁO & TỰ ĐỘNG HÓA",
          desc: "• Theo dõi hiệu suất\n• Báo cáo Looker Studio\n• Báo cáo tùy chỉnh\n• Tự động hóa quy trình làm việc\n• Insight dựa trên dữ liệu"
        }
      ]
    },
    tools: {
      title: "Marketing Tech Stack & Công cụ",
      subtitle: "Hệ thống chuyên môn kỹ thuật của tôi để tự động hóa báo cáo, theo dõi quy kết, phân tích đối thủ cạnh tranh và cấu hình các chiến dịch quy mô lớn.",
      cats: {
        traffic: "Nền tảng Quảng cáo",
        tracking: "Đo lường & Dữ liệu",
        automation: "Dịch vụ Tự động hóa",
        creative: "Thiết kế, Dựng & Nội dung"
      }
    },
    contact: {
      title: "Khởi động Tăng trưởng Chiến dịch Của Bạn Ngay Hôm Nay",
      subtitle: "Bạn có thương hiệu đang sẵn sàng mở rộng, có một ứng dụng cần số lượt cài đặt, hoặc gặp phải một phễu (funnel) cần sự thiết lập quá trình tự động liền mạch? Hãy trao đổi với nhau.",
      formName: "Họ Tên / Tên Doanh Nghiệp",
      formEmail: "Địa chỉ Email",
      formPhone: "Số điện thoại / Zalo",
      formWebsite: "Website / Liên kết Sản phẩm",
      formMsg: "Ngắn gọn giới thiệu về sản phẩm & mức ngân sách mục tiêu hàng tháng của bạn",
      formBtn: "Gửi Yêu Cầu Đề Xuất Tăng Trưởng",
      successMsg: "Cảm ơn bạn! Howard (Đỗ Quang Thanh Bình) đã nhận được yêu cầu của bạn. Tôi sẽ phản hồi trong vòng 30 phút cùng bản phác thảo chiến dịch dành riêng cho bạn.",
      directTel: "Hotline Phone/WhatsApp",
      directEmail: "Địa Chỉ Email Công Việc",
      directLocation: "Khu Vực Làm Việc"
    }
  }
};
