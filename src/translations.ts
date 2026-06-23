export interface TranslationSet {
  nav: {
    about: string;
    metrics: string;
    platforms: string;
    scope: string;
    tools: string;
    cases: string;
    estimator: string;
    contact: string;
  };
  hero: {
    fullName: string;
    subtitle: string;
    headline: string;
    bio: string;
    bullets: string[];
    card: {
      title: string;
      btnCall: string;
      btnEmail: string;
      quickCheck: string;
      responseTime: string;
    };
  };
  metrics: {
    title: string;
    subtitle: string;
    spend: { val: string; label: string; desc: string };
    nmv: { val: string; label: string; desc: string };
    roas: { val: string; label: string; desc: string };
    brands: { val: string; label: string; desc: string };
    cpl: { val: string; label: string; desc: string };
  };
  brands: {
    title: string;
    subtitle: string;
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
  cases: {
    title: string;
    subtitle: string;
    budgetLabel: string;
    roasLabel: string;
    resultLabel: string;
    strategyLabel: string;
    secretLabel: string;
    btnMore: string;
    items: {
      tag: string;
      title: string;
      role: string;
      scope: string;
      spend: string;
      revenue: string;
      roas: string;
      desc: string;
      strategy: string;
      secret: string;
    }[];
  };
  estimator: {
    title: string;
    subtitle: string;
    budget: string;
    objective: string;
    objSales: string;
    objLeads: string;
    platform: string;
    resultsTitle: string;
    estTraffic: string;
    estAction: string;
    estRevenue: string;
    disclaimer: string;
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
    directTitle: string;
    directZalo: string;
    directTel: string;
    directEmail: string;
    directLocation: string;
  };
  footer: {
    rights: string;
    bilingualNotice: string;
  };
}

export const translations: Record<"en" | "vi", TranslationSet> = {
  en: {
    nav: {
      about: "About",
      metrics: "Highlights",
      platforms: "Platforms & Strategies",
      scope: "Scope of Work",
      tools: "Tools & Tech",
      cases: "Case Studies",
      estimator: "ROI Planner",
      contact: "Get in Touch"
    },
    hero: {
      fullName: "DO QUANG THANH BINH (HOWARD)",
      subtitle: "Performance  Marketing  Specialist",
      headline: "Driving Sustainable Growth Through Data-Driven Performance Marketing",
      bio: "I plan, execute, and optimize multi-platform acquisition campaigns across Meta Ads, Google Ads, TikTok Ads, Apple Search Ads, and Zalo Ads. By combining data-driven decision making, creative testing, and workflow automation, I help businesses acquire customers efficiently and scale revenue sustainably.",
      bullets: [
        "Performance-First Marketer: Managing paid acquisition campaigns with a focus on ROAS, CPA efficiency, customer growth, and long-term scalability.",
        "Data-Driven Optimizer: Leveraging analytics, A/B testing, funnel insights, and customer behavior data to continuously improve campaign performance.",
        "Automation Builder: Developing dashboards, reporting systems, and workflow automations using GA4, Looker Studio, Google Apps Script, n8n, and Make.com.",
        "Multi-Platform Media Buyer: Executing and scaling campaigns across Meta Ads, Google Ads, TikTok Ads, Apple Search Ads, and Zalo Ads with structured testing frameworks."
      ],
      card: {
        title: "Primary Work Channels",
        btnCall: "Call & Zalo: +84 788 351 752",
        btnEmail: "Email: thanhbinh72.work@gmail.com",
        quickCheck: "Active Status",
        responseTime: "Response time: < 30 mins"
      }
    },
    metrics: {
      title: "Key Campaign Performance Numbers",
      subtitle: "Verified campaign data optimized and handled directly by Howard across active domestic and international accounts.",
      spend: {
        val: "$25,000+",
        label: "Monthly Ad Spend",
        desc: "Consistently deployed and optimized across Google, Meta, and TikTok."
      },
      nmv: {
        val: "$152,000+",
        label: "Monthly NMV Generated",
        desc: "Net Merchandising Value generated for brand campaigns."
      },
      roas: {
        val: "9.54",
        label: "Peak Campaign ROAS",
        desc: "Return on Ad Spend achieved during major shopping seasonal peaks."
      },
      brands: {
        val: "20+",
        label: "Brands Managed",
        desc: "Direct coordination for premium beauty, e-commerce, and software apps."
      },
      cpl: {
        val: "$0.29",
        label: "Lowest CPL Achieved",
        desc: "Cost Per Lead captured for highly competitive transport app promotions."
      }
    },
    brands: {
      title: "Trust Anchors & Industry Collaborations",
      subtitle: "Collaborating directly with global fast-moving consumer goods giants, prestige cosmetics, and fast-growing technology startups."
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
        title: "Google Ads (PMax & Search)",
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
          desc: "Consolidating TikTok, Google, and Meta APIs into unified transparent reports with instant automated email summaries."
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
          desc: "• Performance tracking\n• Looker Studio dashboards\n• Custom reporting\n• Workflow automations\n• Data-driven insights"
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
        creative: "Research & Content"
      }
    },
    cases: {
      title: "Strategic Case Studies & Results",
      subtitle: "In-depth breakdown of selected high-performance campaigns managed and scaled directly by Howard.",
      budgetLabel: "Monthly Spend",
      roasLabel: "ROAS Ratio",
      resultLabel: "Primary Output",
      strategyLabel: "Strategic Blueprint",
      secretLabel: "Main Lesson / Automation Pivot",
      btnMore: "Show Campaign Details",
      items: [
        {
          tag: "TikTok Shop",
          title: "Scale TikTok Shop campaign performance with extreme 9.54 ROAS.",
          role: "TikTok Ads Specialist",
          scope: "Run ads, Data analytics, Optimized, Report",
          spend: "179,817,302 VND",
          revenue: "1,715,544,567 VND",
          roas: "9.54x",
          desc: "Faced with intense competition in e-commerce, we executed a premium TikTok Shop scaling setup. By running highly focused conversion campaigns, performing continuous data analytics, and continuous optimization, we unlocked maximum checkout velocity.",
          strategy: "Built a massive creator affiliate matrix. Instead of creating expensive ads internally, we whitelisted content from highly engaged TikTok creators, running targeted Spark Ads of their videos pointing to direct in-app checkouts.",
          secret: "Configured Looker Studio trackers that auto-pulled custom affiliate-specific ROAS indexes hourly, allowing us to drop poor videos and scale top-converting creators immediately with zero budget leakage."
        },
        {
          tag: "Google Ads, Meta, TikTok, Apple Ads",
          title: "Drive high-velocity multi-platform app installation scaling with optimal cost metrics.",
          role: "Digital Marketing Specialist",
          scope: "Ads planning, Execution, Data analytics, Optimized, Report",
          spend: "107,245,220 + 107,993,094 VND",
          revenue: "26,097 App installs",
          roas: "đ7,912 - đ8,610 CPI",
          desc: "Executed a comprehensive performance scaling setup across Google App Campaigns and Meta Ads networks. By planning targeted demographic parameters, running highly optimized install ads, and analyzing daily webhooks, we unlocked massive user growth.",
          strategy: "Managed dual-network tracking pipelines with target CPI (tCPI) bidding on Google, paired with custom demographic models and custom visual adsets on Meta.",
          secret: "Utilized direct conversion API validation models that monitored user registration rates hourly, allowing our team to kill inefficient visual assets instantly and direct ad budget to top cohorts."
        },
        {
          tag: "Lead Generation",
          title: "Tri Thuc Trong Tam Tay Lead Gen Funnel: Raising consultation sales form rate by 3.5x.",
          role: "Digital Funnel Specialist",
          scope: "Performance funnels, qualifying pre-screens, and custom data router integrations.",
          spend: "Sustained Scaling",
          revenue: "+ 250% Booked Sales",
          roas: "4.8x ROI",
          desc: "High-friction website forms meant the client was wasting 75% of their ad clicks. We designed a rapid direct-lead form system inside Meta Ads, completely bypassing slow-loading landing pages and qualifying prospects through targeted conditional questions.",
          strategy: "Designed step-by-step qualifying questions inside Meta native instant forms. Potential clients were instantly filtered by their professional budget and urgency before booking an advisor consultation.",
          secret: "Created a real-time validation bot that checked phone numbers automatically for active Telegram/Zalo registration. Fake submissions were tagged and removed automatically from the primary CRM pipeline, saving sales representatives from cold-calling waste."
        }
      ]
    },
    estimator: {
      title: "Custom Interactive Campaign ROI Planner",
      subtitle: "Simulate and estimate your traffic, leads, and potential revenue based on real performance industry benchmarks.",
      budget: "Planned Monthly Ad Budget",
      objective: "Select Strategic Objective",
      objSales: "E-Commerce / Direct Sales",
      objLeads: "Lead Generation / Consultations",
      platform: "Primary Advertising Channel",
      resultsTitle: "Estimated Performance Output",
      estTraffic: "Est. Ad Impressions / Clicks",
      estAction: "Est. Total Sales / Leads Captured",
      estRevenue: "Est. Net Sales Value (ROI)",
      disclaimer: "These estimates are calculated using standard average CTR (1.2% - 2.5%) and conversion rates (1.5% - 5%). Actual metrics depend heavily on creative quality, product offerings, and market fit."
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
      directTitle: "Direct Contact Vault",
      directZalo: "Zalo Chat Direct Link",
      directTel: "Phone/WhatsApp Hotline",
      directEmail: "Work Email Channel",
      directLocation: "Location Node"
    },
    footer: {
      rights: "© 2026 Do Quang Thanh Binh. Portfolio crafted with high-precision design.",
      bilingualNotice: "Fully optimized for English & Vietnamese international communications."
    }
  },
  vi: {
    nav: {
      about: "Giới thiệu",
      metrics: "Chỉ số Nổi bật",
      platforms: "Nền tảng & Chiến lược",
      scope: "Phạm vi Công việc",
      tools: "Công cụ & Công nghệ",
      cases: "Case Studies",
      estimator: "ROI Planner",
      contact: "Liên hệ"
    },
    hero: {
      fullName: "ĐỖ QUANG THANH BÌNH (HOWARD)",
      subtitle: "Chuyên gia Performance Marketing",
      headline: "Thúc đẩy Tăng trưởng Bền vững qua Performance Marketing Dựa trên Dữ liệu",
      bio: "Tôi lập kế hoạch, triển khai và tối ưu hoá các chiến dịch thu hút khách hàng đa nền tảng trên Meta Ads, Google Ads, TikTok Ads, Apple Search Ads và Zalo Ads. Bằng cách kết hợp quyết định dựa trên dữ liệu, thử nghiệm nội dung và tự động hóa quy trình làm việc, tôi giúp các doanh nghiệp thu hút khách hàng với chi phí tối ưu và mở rộng doanh thu một cách bền vững.",
      bullets: [
        "Chuyên viên Marketing Ưu tiên Hiệu suất: Quản lý các chiến dịch quảng cáo trả phí với trọng tâm là ROAS, tối ưu CPA, tăng trưởng khách hàng và khả năng mở rộng dài hạn.",
        "Người Tối ưu hóa Dựa trên Dữ liệu: Tận dụng phân tích, thử nghiệm A/B, dữ liệu phễu và hành vi khách hàng để liên tục cải thiện hiệu suất chiến dịch.",
        "Người Xây dựng Tự động hóa: Phát triển dashboard, hệ thống báo cáo và luồng làm việc tự động hóa bằng GA4, Looker Studio, Google Apps Script, n8n và Make.com.",
        "Người Mua Quảng Cáo Đa Nền Tảng: Triển khai và mở rộng các chiến dịch trên Meta Ads, Google Ads, TikTok Ads, Apple Search Ads và Zalo Ads với khung thử nghiệm có cấu trúc."
      ],
      card: {
        title: "Kênh làm việc chính",
        btnCall: "Gọi & Zalo: +84 788 351 752",
        btnEmail: "Email: thanhbinh72.work@gmail.com",
        quickCheck: "Trạng thái Hoạt động",
        responseTime: "Thời gian phản hồi: < 30 phút"
      }
    },
    metrics: {
      title: "Các Chỉ số Hiệu suất Chiến dịch Chính",
      subtitle: "Dữ liệu chiến dịch thực tế được tối ưu và quản lý trực tiếp bởi Howard trên các tài khoản khách hàng trong nước và quốc tế.",
      spend: {
        val: "$25.000+",
        label: "Ngân sách Quảng cáo Hàng tháng",
        desc: "Được phân bổ ổn định và tối ưu trên nền tảng Google, Meta, và TikTok."
      },
      nmv: {
        val: "$152.000+",
        label: "Doanh số NMV Hàng tháng",
        desc: "Giá trị Hàng hóa Ròng (NMV) tạo ra từ các chiến dịch của thương hiệu."
      },
      roas: {
        val: "9.54",
        label: "ROAS Chiến dịch Đạt đỉnh",
        desc: "Tỷ suất Lợi nhuận trên Ngân sách Quảng cáo đạt được trong các đợt cao điểm mua sắm lớn."
      },
      brands: {
        val: "20+",
        label: "Thương hiệu Quản lý",
        desc: "Phối hợp trực tiếp cho các thương hiệu làm đẹp cao cấp, thương mại điện tử, và ứng dụng phần mềm."
      },
      cpl: {
        val: "$0.29",
        label: "CPL Thấp nhất Đạt được",
        desc: "Chi phí mỗi Lead (CPL) đạt được cho các chiến dịch quảng bá ứng dụng vận tải có độ cạnh tranh cao."
      }
    },
    brands: {
      title: "Sự Tin Tưởng & Hợp Tác Ngành",
      subtitle: "Hợp tác trực tiếp với các tập đoàn hàng tiêu dùng nhanh đa quốc gia, mỹ phẩm cao cấp và startup công nghệ tăng trưởng nhanh."
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
        title: "Google Ads (PMax & Search)",
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
        creative: "Nghiên cứu & Nội dung"
      }
    },
    cases: {
      title: "Case Studies Chiến Lược & Kết Quả",
      subtitle: "Phân tích chi tiết về các chiến dịch hiệu suất cao tiêu biểu được Howard trực tiếp quản lý và mở rộng.",
      budgetLabel: "Ngân sách Hàng tháng",
      roasLabel: "Tỷ lệ ROAS",
      resultLabel: "Đầu ra Chính",
      strategyLabel: "Chiến lược Hành động",
      secretLabel: "Bài học Chính / Bệ phóng Tự động hóa",
      btnMore: "Xem Chi tiết Chiến dịch",
      items: [
        {
          tag: "TikTok Shop",
          title: "Mở rộng hiệu suất chiến dịch TikTok Shop với mức ROAS cực kì ấn tượng 9.54.",
          role: "TikTok Ads Specialist",
          scope: "Chạy quảng cáo, Phân tích dữ liệu, Tối ưu hóa, Báo cáo",
          spend: "179.817.302 VND",
          revenue: "1.715.544.567 VND",
          roas: "9.54x",
          desc: "Đối mặt với sự cạnh tranh khốc liệt trong ngành thương mại điện tử, chúng tôi đã triển khai một hệ thống mở rộng TikTok Shop cao cấp. Bằng cách thực thi các chiến dịch chuyển đổi tập trung, liên tục phân tích dữ liệu và tối ưu hóa không ngừng, chúng tôi đã mở khóa tốc độ thanh toán tối đa.",
          strategy: "Xây dựng ma trận creator affiliate (tiếp thị liên kết nội dung) lớn. Thay vì tốn ngân sách tạo quảng cáo nội bộ, chúng tôi sử dụng nội dung (whitelist) từ các creator TikTok có tương tác cao, thiết lập Spark Ads nhắm mục tiêu dẫn trực tiếp đến thanh toán in-app.",
          secret: "Cấu hình bộ theo dõi Looker Studio để tự động kéo dữ liệu chỉ số ROAS đặc thù cho các affiliate mỗi giờ một lần, qua đó cho phép chúng tôi loại bỏ đoạn video kém chất lượng và nâng ngân sách ngay lập tức cho các creator chuyển đổi tốt mà không bị rò rỉ ngân sách."
        },
        {
          tag: "Google Ads, Meta, TikTok, Apple Ads",
          title: "Thúc đẩy quá trình tải ứng dụng đa nền tảng tốc độ cao với các chỉ số chi phí tối ưu.",
          role: "Digital Marketing Specialist",
          scope: "Kế hoạch quảng cáo, Thực thi, Phân tích dữ liệu, Tối ưu, Báo cáo",
          spend: "107.245.220 + 107.993.094 VND",
          revenue: "26.097 Lượt tải App",
          roas: "7.912đ - 8.610đ CPI",
          desc: "Thực hiện thành công việc mở rộng hiệu suất toàn diện trên mảng quảng cáo Google App Campaigns và Meta Ads. Bằng việc lập kế hoạch cho các thông số nhân khẩu học mục tiêu, chạy quảng cáo cài đặt tối ưu tối đa, và phân tích webhook hàng ngày, chúng tôi đã mở ra sự phát triển người dùng khổng lồ.",
          strategy: "Quản lý hệ thống tracking kép bằng mục tiêu giá thầu CPI (tCPI) trên Google, song song kết hợp với các mô hình nhân khẩu học tùy chỉnh và các adset hình ảnh tùy chỉnh trên Meta.",
          secret: "Tối ưu khai thác các validation API chuyển đổi trực tiếp nhằm đánh giá tỷ lệ người dùng đăng ký hàng giờ, qua đó cho phép đội ngũ loại bỏ các mẫu quảng cáo không hiệu quả lập tức và dồn ngân sách quảng cáo cho nhóm đối tượng tiêu dùng hiệu quả hàng đầu."
        },
        {
          tag: "Lead Generation",
          title: "Phễu Lead Gen Tri Thức Trong Tầm Tay: Nhờ cấu trúc tự động nâng tỷ lệ điền form chốt sale lên 3.5 lần.",
          role: "Digital Funnel Specialist",
          scope: "Phễu hiệu suất, Kiểm tra sơ bộ, Và Tích hợp truyền dữ liệu tùy chỉnh.",
          spend: "Mở rộng duy trì vững chắc",
          revenue: "+ 250% Lịch Hẹn Đã Chốt",
          roas: "4.8x ROI",
          desc: "Form đăng ký thông qua website gây ra nhiều trở ngại khiến khách hàng lãng phí đến 75% lượt nhấp chuột quảng cáo. Chúng tôi đã thiết kế thành công một hệ thống biểu mẫu điền nhanh qua Meta Ads, hoàn toàn ngăn chặn quá trình tải chậm thông qua landing page truyền thống và phân tích đối tượng với phân kỳ tính theo các loại hỏi đáp điều kiện cụ thể.",
          strategy: "Thiết kế hệ thống câu hỏi có tính chuyên môn nội tại ngay trên Meta Instant Forms. Khách hàng tiềm năng sẽ ngay lập tức được lọc theo tình hình tài chính thực tiễn cũng như mức độ cấp bách để mong chờ gọi trợ giúp từ advisor của họ.",
          secret: "Đã tạo một bot xác thực theo thời gian thực tự động kiểm tra số điện thoại nhằm phát hiện những hồ sơ Telegram/Zalo còn hoạt động. Những khách điền form ảo đã bị nhận diện làm giả và xóa mờ một cách tự động khỏi hệ thống kiểm duyệt CRM quan trọng nhất, hỗ trợ đội ngũ sales của chúng tôi tối khỏi cuộc đối thoại vô vị tốn thời gian."
        }
      ]
    },
    estimator: {
      title: "Công cụ Lên Kế hoạch ROI Chiến dịch Tương tác Tính Chọn",
      subtitle: "Mô phỏng và ước tính lưu lượng truy cập, lead và doanh thu tiềm năng của bạn dựa trên điểm chuẩn hiệu suất thực tế của ngành.",
      budget: "Ngân sách Quảng cáo Hàng tháng Dự kiến",
      objective: "Chọn Mục tiêu Chiến lược",
      objSales: "Thương mại Điện tử / Bán hàng Trực tiếp",
      objLeads: "Thu thập Lead / Đặt lịch Tư vấn",
      platform: "Kênh Quảng cáo Chính",
      resultsTitle: "Đầu ra Hiệu suất Ước tính",
      estTraffic: "Số lần Hiển thị Quảng cáo / Click Ước tính",
      estAction: "Tổng Doanh số / Số lượng Lead Ước tính",
      estRevenue: "Giá trị Doanh thu Ròng (ROI) Ước tính",
      disclaimer: "Các ước tính này được tính toán dựa trên mức trung bình chuẩn của CTR (1,2% - 2,5%) và tỷ lệ chuyển đổi (1,5% - 5%). Các chỉ số thực tế phụ thuộc rất nhiều vào chất lượng nội dung quảng cáo, sản phẩm và mức độ phù hợp với thị trường."
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
      directTitle: "Kênh Liên Hệ Trực Tiếp",
      directZalo: "Liên Kết Zalo Chat",
      directTel: "Hotline Phone/WhatsApp",
      directEmail: "Địa Chỉ Email Công Việc",
      directLocation: "Khu Vực Làm Việc"
    },
    footer: {
      rights: "© 2026 Đỗ Quang Thanh Bình. Portfolio được thiếp lập với độ chính xác và thiết kế cẩn thận.",
      bilingualNotice: "Đơn vị tối ưu chuẩn phù hợp dành cho giao tiếp thương mại qua nền tảng song ngữ Tiếng Anh và Tiếng Việt."
    }
  }
};
