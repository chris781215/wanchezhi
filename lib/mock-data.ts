import { User, Community, Post, Comment } from '@/types';

// Mock users (empty - dynamically registered users are persisted in data/users.json)
export const mockUsers: User[] = [];

// Mock communities (empty - dynamically created communities are persisted in data/communities.json)
export const mockCommunities: Community[] = [];

// Mock posts (empty - dynamically created posts are persisted in data/posts.json)
export const mockPosts: Post[] = [];

// Mock comments (empty - dynamically created comments are persisted in data/comments.json)
export const mockComments: Comment[] = [];

// Preset car models for community creation
export const presetCarModels = [
  // 奔驰
  { slug: 'w221', brand: '奔驰', code: 'W221', displayName: '奔驰 W221 (S级 2005-2013)' },
  { slug: 'w222', brand: '奔驰', code: 'W222', displayName: '奔驰 W222 (S级 2013-2020)' },
  { slug: 'w206', brand: '奔驰', code: 'W206', displayName: '奔驰 W206 (C级 2021-)' },
  { slug: 'm272', brand: '奔驰', code: 'M272', displayName: '奔驰 M272 发动机' },
  { slug: 'm276', brand: '奔驰', code: 'M276', displayName: '奔驰 M276 发动机' },
  { slug: 'm156', brand: '奔驰', code: 'M156', displayName: '奔驰 M156 (AMG 6.2L V8)' },
  // 宝马
  { slug: 'e46', brand: '宝马', code: 'E46', displayName: '宝马 E46 (3系 1998-2006)' },
  { slug: 'e90', brand: '宝马', code: 'E90', displayName: '宝马 E90 (3系 2005-2012)' },
  { slug: 'f30', brand: '宝马', code: 'F30', displayName: '宝马 F30 (3系 2012-2019)' },
  { slug: 'g20', brand: '宝马', code: 'G20', displayName: '宝马 G20 (3系 2019-)' },
  { slug: 'b58', brand: '宝马', code: 'B58', displayName: '宝马 B58 发动机' },
  { slug: 'n54', brand: '宝马', code: 'N54', displayName: '宝马 N54 发动机' },
  { slug: 's58', brand: '宝马', code: 'S58', displayName: '宝马 S58 (M Power)' },
  // 奥迪
  { slug: 'b8', brand: '奥迪', code: 'B8', displayName: '奥迪 B8 (A4 2007-2015)' },
  { slug: 'b9', brand: '奥迪', code: 'B9', displayName: '奥迪 B9 (A4 2015-)' },
  { slug: 'c7', brand: '奥迪', code: 'C7', displayName: '奥迪 C7 (A6 2011-2018)' },
  { slug: 'ea888', brand: '奥迪', code: 'EA888', displayName: '大众/奥迪 EA888 发动机' },
  { slug: 'ea855', brand: '奥迪', code: 'EA855', displayName: '奥迪 EA855 (2.5T 直五)' },
  // 大众
  { slug: 'mk7', brand: '大众', code: 'MK7', displayName: '大众高尔夫 MK7' },
  { slug: 'mk8', brand: '大众', code: 'MK8', displayName: '大众高尔夫 MK8' },
  { slug: 'ea113', brand: '大众', code: 'EA113', displayName: '大众 EA113 发动机' },
  // 丰田
  { slug: '2jz', brand: '丰田', code: '2JZ', displayName: '丰田 2JZ 发动机' },
  { slug: '1jz', brand: '丰田', code: '1JZ', displayName: '丰田 1JZ 发动机' },
  { slug: 'gr86', brand: '丰田', code: 'GR86', displayName: '丰田 GR86' },
  { slug: 'supra-a90', brand: '丰田', code: 'Supra_A90', displayName: '丰田 Supra A90' },
  // 本田
  { slug: 'k20', brand: '本田', code: 'K20', displayName: '本田 K20 发动机' },
  { slug: 'b16', brand: '本田', code: 'B16', displayName: '本田 B16 发动机' },
  { slug: 'type-r-fl5', brand: '本田', code: 'TypeR_FL5', displayName: '本田 Civic Type R FL5' },
  // 日产
  { slug: 'rb26', brand: '日产', code: 'RB26', displayName: '日产 RB26 发动机' },
  { slug: 'vr38', brand: '日产', code: 'VR38', displayName: '日产 VR38 (GT-R)' },
  { slug: 'r35', brand: '日产', code: 'R35', displayName: '日产 GT-R R35' },
  // 马自达
  { slug: 'rx7-fd', brand: '马自达', code: 'RX7_FD', displayName: '马自达 RX-7 FD' },
  { slug: '13b', brand: '马自达', code: '13B', displayName: '马自达 13B 转子发动机' },
  { slug: 'mx5-nd', brand: '马自达', code: 'MX5_ND', displayName: '马自达 MX-5 ND' },
  // 保时捷
  { slug: '997', brand: '保时捷', code: '997', displayName: '保时捷 911 997' },
  { slug: '992', brand: '保时捷', code: '992', displayName: '保时捷 911 992' },
  { slug: 'cayman-981', brand: '保时捷', code: 'Cayman_981', displayName: '保时捷 Cayman 981' },
  // 斯巴鲁
  { slug: 'ej20', brand: '斯巴鲁', code: 'EJ20', displayName: '斯巴鲁 EJ20 发动机' },
  { slug: 'ej25', brand: '斯巴鲁', code: 'EJ25', displayName: '斯巴鲁 EJ25 发动机' },
  { slug: 'wrx-va', brand: '斯巴鲁', code: 'WRX_VA', displayName: '斯巴鲁 WRX VA' },
  // 福特
  { slug: 'mustang-s550', brand: '福特', code: 'Mustang_S550', displayName: '福特 Mustang S550' },
  { slug: 'ecoboost', brand: '福特', code: 'EcoBoost', displayName: '福特 EcoBoost 发动机' },
  // 玛莎拉蒂
  { slug: 'm139', brand: '玛莎拉蒂', code: 'M139', displayName: '玛莎拉蒂 M139' },
  { slug: 'mc20', brand: '玛莎拉蒂', code: 'MC20', displayName: '玛莎拉蒂 MC20' },
  { slug: 'nettuno', brand: '玛莎拉蒂', code: 'Nettuno', displayName: '玛莎拉蒂 Nettuno 发动机' },
  // 兰博基尼
  { slug: 'huracan', brand: '兰博基尼', code: 'Huracan', displayName: '兰博基尼 Huracan' },
  { slug: 'urus', brand: '兰博基尼', code: 'Urus', displayName: '兰博基尼 Urus' },
  // 法拉利
  { slug: 'f8', brand: '法拉利', code: 'F8', displayName: '法拉利 F8 Tributo' },
  { slug: '296', brand: '法拉利', code: '296', displayName: '法拉利 296 GTB' },
  // 宾利
  { slug: 'continental', brand: '宾利', code: 'Continental', displayName: '宾利 Continental GT' },
  // 劳斯莱斯
  { slug: 'ghost', brand: '劳斯莱斯', code: 'Ghost', displayName: '劳斯莱斯 Ghost' },
  // 雪佛兰
  { slug: 'camaro', brand: '雪佛兰', code: 'Camaro', displayName: '雪佛兰 Camaro' },
  { slug: 'corvette', brand: '雪佛兰', code: 'Corvette', displayName: '雪佛兰 Corvette' },
  // 别克
  { slug: 'regal', brand: '别克', code: 'Regal', displayName: '别克 Regal/君威' },
  // 现代
  { slug: 'i30n', brand: '现代', code: 'i30N', displayName: '现代 i30 N' },
  { slug: 'elantra-n', brand: '现代', code: 'ElantraN', displayName: '现代 Elantra N' },
  // 起亚
  { slug: 'stinger', brand: '起亚', code: 'Stinger', displayName: '起亚 Stinger' },
  // 标致
  { slug: '208', brand: '标致', code: '208', displayName: '标致 208' },
  // 沃尔沃
  { slug: 's60', brand: '沃尔沃', code: 'S60', displayName: '沃尔沃 S60' },
  { slug: 'xc90', brand: '沃尔沃', code: 'XC90', displayName: '沃尔沃 XC90' },
  // 路虎
  { slug: 'defender', brand: '路虎', code: 'Defender', displayName: '路虎 Defender' },
  // 捷豹
  { slug: 'ftype', brand: '捷豹', code: 'F-Type', displayName: '捷豹 F-Type' },
  // 凯迪拉克
  { slug: 'ct5', brand: '凯迪拉克', code: 'CT5', displayName: '凯迪拉克 CT5' },
  { slug: 'ctsv', brand: '凯迪拉克', code: 'CTS-V', displayName: '凯迪拉克 CTS-V' },
  // 特斯拉
  { slug: 'model3', brand: '特斯拉', code: 'Model3', displayName: '特斯拉 Model 3' },
  { slug: 'modely', brand: '特斯拉', code: 'ModelY', displayName: '特斯拉 Model Y' },
  // 三菱
  { slug: 'evo', brand: '三菱', code: 'EVO', displayName: '三菱 Lancer Evolution' },
  { slug: '4g63', brand: '三菱', code: '4G63', displayName: '三菱 4G63 发动机' },
  // 铃木
  { slug: 'jimny', brand: '铃木', code: 'Jimny', displayName: '铃木 Jimny' },
  { slug: 'swift-sport', brand: '铃木', code: 'SwiftSport', displayName: '铃木 Swift Sport' },
  // 雷克萨斯
  { slug: 'is-f', brand: '雷克萨斯', code: 'IS-F', displayName: '雷克萨斯 IS-F' },
  { slug: 'lfa', brand: '雷克萨斯', code: 'LFA', displayName: '雷克萨斯 LFA' },
  // 比亚迪
  { slug: 'han', brand: '比亚迪', code: 'Han', displayName: '比亚迪 汉' },
  { slug: 'seal', brand: '比亚迪', code: 'Seal', displayName: '比亚迪 海豹' },
  // 蔚来
  { slug: 'et5', brand: '蔚来', code: 'ET5', displayName: '蔚来 ET5' },
  { slug: 'es6', brand: '蔚来', code: 'ES6', displayName: '蔚来 ES6' },
  // 小鹏
  { slug: 'p7', brand: '小鹏', code: 'P7', displayName: '小鹏 P7' },
  // 理想
  { slug: 'l9', brand: '理想', code: 'L9', displayName: '理想 L9' },
  // 吉利
  { slug: 'xingrui', brand: '吉利', code: 'Xingrui', displayName: '吉利 星瑞' },
  // 领克
  { slug: '03plus', brand: '领克', code: '03+', displayName: '领克 03+' },
  // 极氪
  { slug: '001', brand: '极氪', code: '001', displayName: '极氪 001' },
  // 小米
  { slug: 'su7', brand: '小米', code: 'SU7', displayName: '小米 SU7' },
];
