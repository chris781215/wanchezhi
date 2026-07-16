import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const presetCommunities = [
  // 奔驰
  { slug: 'w221', brand: '奔驰', code: 'W221', displayName: 'W221', description: '奔驰 W221 底盘，第十代S级轿车（2005-2013），搭载M272/M273发动机' },
  { slug: 'w222', brand: '奔驰', code: 'W222', displayName: 'W222', description: '奔驰 W222 底盘，第十一代S级轿车（2013-2020）' },
  { slug: 'w206', brand: '奔驰', code: 'W206', displayName: 'W206', description: '奔驰 W206 底盘，新一代C级轿车（2021-）' },
  { slug: 'm272', brand: '奔驰', code: 'M272', displayName: 'M272', description: '奔驰 M272 发动机，3.5L V6自然吸气' },
  { slug: 'm276', brand: '奔驰', code: 'M276', displayName: 'M276', description: '奔驰 M276 发动机，3.0T V6双涡轮增压' },
  { slug: 'm156', brand: '奔驰', code: 'M156', displayName: 'M156', description: '奔驰 M156 发动机，AMG 6.2L V8自然吸气' },
  // 宝马
  { slug: 'e46', brand: '宝马', code: 'E46', displayName: 'E46', description: '宝马 E46 底盘，第四代3系（1998-2006），经典直六M54发动机' },
  { slug: 'e90', brand: '宝马', code: 'E90', displayName: 'E90', description: '宝马 E90 底盘，第五代3系（2005-2012）' },
  { slug: 'f30', brand: '宝马', code: 'F30', displayName: 'F30', description: '宝马 F30 底盘，第六代3系（2012-2019）' },
  { slug: 'g20', brand: '宝马', code: 'G20', displayName: 'G20', description: '宝马 G20 底盘，第七代3系（2019-）' },
  { slug: 'b58', brand: '宝马', code: 'B58', displayName: 'B58', description: '宝马 B58 发动机，新一代3.0T直列六缸涡轮增压' },
  { slug: 'n54', brand: '宝马', code: 'N54', displayName: 'N54', description: '宝马 N54 发动机，3.0T直列六缸双涡轮增压' },
  { slug: 's58', brand: '宝马', code: 'S58', displayName: 'S58', description: '宝马 S58 发动机，M Power 3.0T直列六缸双涡轮增压' },
  // 奥迪
  { slug: 'b8', brand: '奥迪', code: 'B8', displayName: 'B8', description: '奥迪 B8 底盘，第四代A4（2007-2015），MLB平台' },
  { slug: 'b9', brand: '奥迪', code: 'B9', displayName: 'B9', description: '奥迪 B9 底盘，第五代A4（2015-）' },
  { slug: 'c7', brand: '奥迪', code: 'C7', displayName: 'C7', description: '奥迪 C7 底盘，第四代A6（2011-2018）' },
  // 大众/奥迪发动机
  { slug: 'ea888', brand: '大众', code: 'EA888', displayName: 'EA888', description: '大众 EA888 发动机，集团主力2.0T，覆盖高尔夫GTI、奥迪A4等' },
  { slug: 'ea113', brand: '大众', code: 'EA113', displayName: 'EA113', description: '大众 EA113 发动机，经典2.0T，R32/Golf R搭载' },
  { slug: 'ea855', brand: '奥迪', code: 'EA855', displayName: 'EA855', description: '奥迪 EA855 发动机，2.5T直列五缸涡轮增压' },
  // 大众车型
  { slug: 'mk7', brand: '大众', code: 'MK7', displayName: 'MK7', description: '大众 MK7 底盘，第七代高尔夫（2012-2020）' },
  { slug: 'mk8', brand: '大众', code: 'MK8', displayName: 'MK8', description: '大众 MK8 底盘，第八代高尔夫（2020-）' },
  // 丰田
  { slug: '2jz', brand: '丰田', code: '2JZ', displayName: '2JZ', description: '丰田 2JZ 发动机，传奇3.0T直列六缸，Supra JZA80搭载' },
  { slug: '1jz', brand: '丰田', code: '1JZ', displayName: '1JZ', description: '丰田 1JZ 发动机，2.5T直列六缸' },
  { slug: 'gr86', brand: '丰田', code: 'GR86', displayName: 'GR86', description: '丰田 GR86，与斯巴鲁BRZ合作开发' },
  { slug: 'supra-a90', brand: '丰田', code: 'Supra_A90', displayName: 'Supra_A90', description: '丰田 Supra A90，新一代Supra，搭载宝马B58发动机' },
  // 本田
  { slug: 'k20', brand: '本田', code: 'K20', displayName: 'K20', description: '本田 K20 发动机，2.0L自然吸气/涡轮增压' },
  { slug: 'b16', brand: '本田', code: 'B16', displayName: 'B16', description: '本田 B16 发动机，经典VTEC 1.6L' },
  { slug: 'type-r-fl5', brand: '本田', code: 'TypeR_FL5', displayName: 'TypeR_FL5', description: '本田 Type R FL5，第六代Civic Type R' },
  // 日产
  { slug: 'rb26', brand: '日产', code: 'RB26', displayName: 'RB26', description: '日产 RB26 发动机，2.6T直列六缸双涡轮增压，Skyline GT-R搭载' },
  { slug: 'vr38', brand: '日产', code: 'VR38', displayName: 'VR38', description: '日产 VR38 发动机，3.8T V6双涡轮增压，GT-R R35搭载' },
  { slug: 'r35', brand: '日产', code: 'R35', displayName: 'R35', description: '日产 GT-R R35，战神GT-R（2007-）' },
  // 马自达
  { slug: 'rx7-fd', brand: '马自达', code: 'RX7_FD', displayName: 'RX7_FD', description: '马自达 RX-7 FD，第三代RX-7，搭载13B-REW转子发动机' },
  { slug: '13b', brand: '马自达', code: '13B', displayName: '13B', description: '马自达 13B 转子发动机，1.3L双转子涡轮增压' },
  { slug: 'mx5-nd', brand: '马自达', code: 'MX5_ND', displayName: 'MX5_ND', description: '马自达 MX-5 ND，第四代MX-5 Miata' },
  // 保时捷
  { slug: '997', brand: '保时捷', code: '997', displayName: '997', description: '保时捷 997，997代911（2004-2012）' },
  { slug: '992', brand: '保时捷', code: '992', displayName: '992', description: '保时捷 992，992代911（2019-）' },
  { slug: 'cayman-981', brand: '保时捷', code: 'Cayman_981', displayName: 'Cayman_981', description: '保时捷 Cayman 981，Cayman/Boxster 981代' },
  // 斯巴鲁
  { slug: 'ej20', brand: '斯巴鲁', code: 'EJ20', displayName: 'EJ20', description: '斯巴鲁 EJ20 发动机，2.0T水平对置四缸涡轮增压' },
  { slug: 'ej25', brand: '斯巴鲁', code: 'EJ25', displayName: 'EJ25', description: '斯巴鲁 EJ25 发动机，2.5T水平对置四缸涡轮增压' },
  { slug: 'wrx-va', brand: '斯巴鲁', code: 'WRX_VA', displayName: 'WRX_VA', description: '斯巴鲁 WRX VA，VA代WRX（2014-2021）' },
  // 福特
  { slug: 'mustang-s550', brand: '福特', code: 'Mustang_S550', displayName: 'Mustang_S550', description: '福特 Mustang S550，第六代Mustang（2015-2023）' },
  { slug: 'ecoboost', brand: '福特', code: 'EcoBoost', displayName: 'EcoBoost', description: '福特 EcoBoost 发动机，EcoBoost系列涡轮增压' },
];

async function main() {
  console.log('Seeding database...');

  // Delete existing communities to clean up old Chinese slugs
  await prisma.community.deleteMany({});

  // Create a system user for preset communities
  const systemUser = await prisma.user.upsert({
    where: { email: 'system@wanchezhi.com' },
    update: {},
    create: {
      email: 'system@wanchezhi.com',
      nickname: '系统管理员',
      passwordHash: 'system',
      points: 0,
    },
  });

  // Create preset communities
  for (const comm of presetCommunities) {
    await prisma.community.upsert({
      where: { slug: comm.slug },
      update: {},
      create: {
        ...comm,
        createdById: systemUser.id,
      },
    });
  }

  console.log(`Created ${presetCommunities.length} preset communities`);
  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
