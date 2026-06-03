export const INITIAL_DATA = {
  floors: [
    {
      id: "f1",
      floorName: "১০ম তলা",
      deptName: "চেয়ারম্যান দপ্তর",
      routers: [
        { id: "r1", name: "TP-Link WR940N (মেইন)", ip: "192.168.1.1", user: "admin", pass: "admin123", note: "চেয়ারম্যান রুম সংলগ্ন" },
        { id: "r2", name: "TP-Link WR840N (ব্যাকআপ)", ip: "192.168.1.2", user: "admin", pass: "tplink@2024", note: "কনফারেন্স রুম" }
      ]
    },
    {
      id: "f2",
      floorName: "১০ম তলা",
      deptName: "সংস্থাপন বিভাগ",
      routers: [
        { id: "r3", name: "Mikrotik RB750Gr3", ip: "192.168.2.1", user: "admin", pass: "mikro@sanstha", note: "মূল করিডোর" }
      ]
    },
    {
      id: "f3",
      floorName: "১০ম তলা",
      deptName: "আইন বিভাগ",
      routers: [
        { id: "r4", name: "D-Link DIR-605L", ip: "192.168.3.1", user: "admin", pass: "dlink@ain", note: "" }
      ]
    },
    {
      id: "f4",
      floorName: "৯ম তলা",
      deptName: "অডিট বিভাগ",
      routers: [
        { id: "r5", name: "TP-Link Archer C6 #1", ip: "192.168.4.1", user: "admin", pass: "audit@tp1", note: "পূর্ব ব্লক" },
        { id: "r6", name: "TP-Link Archer C6 #2", ip: "192.168.4.2", user: "admin", pass: "audit@tp2", note: "পশ্চিম ব্লক" },
        { id: "r7", name: "Huawei AP", ip: "192.168.4.3", user: "admin", pass: "huawei#123", note: "ওয়্যারলেস এক্সটেন্ডার" }
      ]
    },
    {
      id: "f5",
      floorName: "৮ম তলা",
      deptName: "উদ্যান উন্নয়ন বিভাগ",
      routers: [
        { id: "r8", name: "Mikrotik hAP ac²", ip: "192.168.0.233:8080", user: "admin", pass: "finance@mk", note: "" }
      ]
    },
    {
      id: "f6",
      floorName: "৭ম তলা",
      deptName: "প্রশাসন বিভাগ",
      routers: [
        { id: "r9", name: "TP-Link Archer A6", ip: "192.168.6.1", user: "admin", pass: "admin@proshason", note: "মেইন হল" },
        { id: "r10", name: "TP-Link WR840N", ip: "192.168.6.2", user: "admin", pass: "wr840@06", note: "স্টোর রুম পাশে" }
      ]
    },
    {
      id: "f7",
      floorName: "৬ষ্ঠ তলা",
      deptName: "আইসিটি বিভাগ (সার্ভার রুম)",
      routers: [
        { id: "r11", name: "Mikrotik CCR1036 (কোর)", ip: "10.0.0.1", user: "admin", pass: "CCR@ICT#Main", note: "মেইন ইন্টারনেট গেটওয়ে" },
        { id: "r12", name: "Cisco Catalyst 2960", ip: "10.0.0.2", user: "cisco", pass: "cisco@switch2024", note: "ডিস্ট্রিবিউশন সুইচ" }
      ]
    }
  ]
};
