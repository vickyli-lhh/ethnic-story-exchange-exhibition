import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = hasSupabaseEnv ? createClient(supabaseUrl!, supabaseAnonKey!) : null

export type Story = {
  id: string
  title: string
  country: string
  content: string
  author: string
  lat: number
  lng: number
  created_at: string
  comments?: Comment[]
}

export type Comment = {
  id: string
  story_id: string
  nickname: string
  content: string
  created_at: string
}

export type PresetMarker = {
  id: string
  label: string
  lat: number
  lng: number
  region: string
  description?: string
}

export const PRESET_MARKERS: PresetMarker[] = [
  {
    id: 'india-srilanka',
    label: 'India & Sri Lanka',
    lat: 15.0,
    lng: 80.0,
    region: 'South Asia',
    description: `斯里蘭卡
Sri Lanka has long experienced ethnic conflict between the Sinhalese and Tamil communities, mainly surrounding issues of political power, language, and unequal resource distribution. During British colonial rule, the “divide and rule” policy gave many English-educated Tamils advantages in government and education, which deepened ethnic tensions. After independence in 1948, the government promoted Sinhalese nationalism. In 1956, the “Sinhala Only Act” made Sinhala the sole official language, limiting Tamil access to education, employment, and political participation. This led to growing dissatisfaction among Tamils. Some Tamil groups later demanded autonomy and formed the Liberation Tigers of Tamil Eelam (LTTE), seeking an independent Tamil state. The conflict eventually developed into a civil war lasting from 1983 to 2009, causing tens of thousands of deaths. Although the war has ended, issues of ethnic equality, cultural recognition, and political rights in Sri Lanka continue to be discussed today.
斯里蘭卡長期受困於 僧伽羅人（Sinhalese） 與 泰米爾人（Tamils） 之間的政治、語言與權力分配問題，最後甚至演變成長達26年的內戰。
英國殖民時期，該國採取「分而治之」政策，使受英語教育較多的泰米爾人在政府與教育體系中占有優勢，埋下族群矛盾。1948年獨立後，政府推動僧伽羅民族主義，1956年通過「僧伽羅語唯一官方語言法案」，造成泰米爾人在教育、就業與政治參與上受到限制，引發強烈不滿。之後泰米爾族開始要求自治，甚至成立武裝組織「泰米爾之虎（LTTE）」爭取獨立，最終爆發1983年至2009年的長期內戰，造成數萬人死亡。雖然內戰已結束，但族群間的平等、文化與政治權利問題，至今仍持續被討論。`,
  },
  {
    id: 'indonesia-timor',
    label: 'Indonesia & Timor-Leste',
    lat: -5.0,
    lng: 120.0,
    region: 'Southeast Asia',
    description: `東帝汶
Timor-Leste, was once a Portuguese colony. After declaring independence in 1975, it was invaded and occupied by Indonesia, becoming Indonesia’s 27th province, although the United Nations never officially recognized the annexation. Due to differences in colonial history, religion, culture, and political identity, many East Timorese continued to resist Indonesian rule and demand independence. The independence movement relied on armed resistance, international advocacy, and the unifying role of the Catholic Church. Important leaders included Xanana Gusmão, José Ramos-Horta, and Bishop Carlos Belo. In 1999, a UN-supervised referendum showed that most people supported independence, and Timor-Leste officially became an independent country in 2002. Although the country still faces poverty and political challenges, its long struggle for self-determination remains an important example of a modern independence movement.
東帝汶 曾為葡萄牙殖民地，1975年宣布獨立後，隨即遭印尼入侵並被併為第27省，但聯合國始終不承認。東帝汶人民因殖民歷史、宗教文化與政治經驗與印尼不同，加上長期面對軍事高壓統治，因此持續追求獨立。東帝汶以武裝抗爭、海外外交與天主教會凝聚民心，其中古斯毛、霍塔與貝婁為重要領導人物。1999年，在聯合國主持下舉行公投，多數人民選擇獨立，2002年正式建國。雖然獨立後仍面臨貧窮、政治衝突與經濟發展問題，但東帝汶人民長期追求自決與自由的努力，也成為民族獨立運動的重要案例。`,
  },
  {
    id: 'israel-palestine',
    label: 'Israel & Palestine',
    lat: 31.5,
    lng: 34.9,
    region: 'Middle East',
    description: `以色列&巴勒斯坦
The conflict between Israel and Palestine is one of the world’s longest and most complex ethnic and territorial conflicts. In the late 19th century, the rise of Zionism encouraged many Jewish people facing antisemitism in Europe to return to Palestine and establish a Jewish homeland. However, large Arab Palestinian communities were already living in the region. In 1947, the United Nations proposed a partition plan to divide the land into Jewish and Arab states, but Arab nations rejected it. In 1948, war broke out after the establishment of Israel, leading to the displacement of many Palestinians. Since then, conflicts over land, Jerusalem, water resources, refugees, and security have repeatedly led to wars and violence, including the Six-Day War, the Palestinian Intifadas, and the Gaza conflicts. Organizations such as the Palestine Liberation Organization (PLO) and Hamas emerged during this period. Although peace efforts like the Oslo Accords created hope for coexistence, lasting peace has not yet been achieved. Today, the conflict continues to affect millions of lives and remains a major issue in global discussions about peace, human rights, and self-determination.
以色列 與 巴勒斯坦 的衝突，是當代最長期且複雜的民族與領土衝突之一。19世紀末，受到歐洲反猶主義影響，猶太民族主義「錫安主義」興起，大量猶太人返回巴勒斯坦地區，希望建立自己的國家；然而，當地原本已有大量巴勒斯坦阿拉伯人居住。1947年，聯合國提出分治方案，將土地分為猶太國與阿拉伯國，但阿拉伯國家反對，隔年爆發第一次以阿戰爭，以色列建國後也造成大量巴勒斯坦人流離失所。之後雙方因土地、耶路撒冷、水資源、難民與安全問題，多次爆發戰爭與衝突，包括六日戰爭、巴勒斯坦人民起義（Intifada）與加薩衝突。巴勒斯坦解放組織（PLO）與哈瑪斯（Hamas）等組織相繼出現，而和平談判如《奧斯陸協議》雖曾帶來希望，但始終未能完全解決問題。至今，以巴衝突仍深刻影響當地人民的生活與中東局勢，也持續引發全球對和平、人權與民族自決的討論。`,
  },
  {
    id: 'japan',
    label: 'Japan',
    lat: 36.2,
    lng: 138.2,
    region: 'East Asia',
    description: `日本
Zainichi, are Koreans and their descendants who remained in Japan during and after Japan’s colonial rule over Korea (1910–1945). Many Koreans moved to Japan because of poverty, colonial policies, or forced labor during the imperial period. After World War II, Japan lost control of Korea, and the Korean Peninsula was divided into North and South Korea, making the identity and legal status of Zainichi Koreans increasingly complex. Some supported North Korea through the organization Chongryon, while others supported South Korea through Mindan, and some later became Japanese citizens through naturalization. For decades, Zainichi Koreans have faced discrimination, exclusion, and pressure to assimilate into Japanese society. Korean schools in Japan have also faced political and financial challenges. At the same time, Zainichi Koreans have actively preserved their language and culture while participating in anti-discrimination movements. Today, younger generations often develop more diverse identities, seeing themselves not only as Korean or Japanese, but also as multicultural members of Japanese society.
在日朝鮮人指日本殖民統治朝鮮半島期間，以及二戰後留在日本生活的朝鮮人及其後代。
1910年日本吞併朝鮮後，許多朝鮮人因貧困、殖民壓迫或被強制勞動而前往日本。二戰結束後，日本失去對朝鮮半島的統治，朝鮮半島又分裂為南北韓，使在日朝鮮人的國籍、身份與認同更加複雜。部分人支持北韓，加入「朝鮮總聯」，部分則支持南韓、加入「民團」，也有人選擇歸化成日本國籍。長期以來，在日朝鮮人面臨歧視、排外與同化壓力，例如朝鮮學校被排除於補助政策之外，社會上也曾出現仇恨言論。然而，他們同時也推動反歧視運動、保存語言與文化，逐漸形成多元的身份認同。如今，許多年輕世代已不再只以「韓國人」或「朝鮮人」自居，而是認同自己是「在日朝鮮人」或具有跨文化背景的日本社會成員。`,
  },
  {
    id: 'central-asia-balkans',
    label: 'Balkans',
    lat: 42.0,
    lng: 22.0,
    region: 'Balkans',
    description: `巴爾幹
The Balkan Peninsula has long been a crossroads of different ethnic groups, religions, and empires. After Slavic peoples migrated into the region in the 6th century, different rulers shaped diverse religious identities, including Eastern Orthodoxy, Catholicism, and Islam. The Ottoman Empire’s expansion in the 15th century further increased ethnic mixing and religious divisions. World War I began after the 1914 assassination in Sarajevo. After the war, the Kingdom of Yugoslavia was established, but Serbian political and economic dominance created tensions among other ethnic groups. During World War II, violent conflicts and massacres between nationalist and fascist groups left deep historical trauma. After the war, leader Josip Broz Tito created socialist Yugoslavia and promoted “ethnic equality” to suppress nationalism and maintain unity. However, after Tito’s death in 1980, economic inequality, nationalism, and religious tensions resurfaced. In the 1990s, Slovenia, Croatia, Bosnia and other republics declared independence, leading to the Yugoslav Wars and the Bosnian War. Ethnic cleansing and mass displacement shocked the world. The 1995 Dayton Agreement helped end most of the fighting. Today, the Balkans are more peaceful and focused on regional cooperation, yet memories of war, ethnic identity, and border disputes still continue to shape the region.
巴爾幹半島長期是多民族、多宗教交會之地。6世紀斯拉夫人遷入後，因不同統治勢力影響，形成東正教、天主教與伊斯蘭教並存的局面。15世紀鄂圖曼帝國入侵，使部分居民伊斯蘭化，也加深族群混居與認同差異。
第一次世界大戰因1914年塞拉耶佛事件爆發，戰後成立南斯拉夫王國，但塞爾維亞在政治與經濟上的主導，引發其他民族不滿。第二次世界大戰期間，各民族與政治勢力互相屠殺，留下深刻歷史傷痕。戰後，狄托建立南斯拉夫聯邦，以「民族平等」壓制民族主義，暫時維持穩定。1980年狄托去世後，經濟差距、民族主義與宗教矛盾再次浮現。1990年代，斯洛維尼亞、克羅埃西亞、波士尼亞等地相繼獨立，引發南斯拉夫內戰與波士尼亞戰爭，甚至出現「種族清洗」。1995年《岱頓協定》後，戰爭逐漸結束。今日巴爾幹地區雖已走向和平與區域合作，但民族認同、歷史記憶與邊界問題，仍深深影響當地社會。`,
  },
  {
    id: 'germany',
    label: 'Germany',
    lat: 51.2,
    lng: 10.4,
    region: 'Western Europe',
    description: `德國
二戰後的德國，在經濟重建與工業快速發展下，大量引進來自土耳其、南歐與東歐的「客工」補充勞動力。其中，土耳其移民逐漸成為德國最大的移民族群之一。他們參與工廠、礦業與基礎建設，支撐了德國經濟奇蹟，卻長期被視為「暫時的外來者」，面臨文化隔閡、身份排除與社會歧視。1990年東西德統一後，失業、經濟落差與社會不安加劇，部分極右勢力將移民與難民視為問題根源，排外與新納粹思潮因此再度興起。德國社會一方面反省納粹歷史，另一方面也持續面對民族認同、多元文化與移民融合的挑戰。
After World War II, Germany recruited large numbers of foreign laborers, especially from Turkey, to support economic reconstruction. Although these workers became essential to German industry and society, they were often treated as temporary outsiders rather than equal members of the nation.
Following German reunification in 1990, unemployment, economic inequality, and social anxiety intensified, particularly in former East Germany. In this climate, far-right nationalism and neo-Nazi movements re-emerged, blaming immigrants and refugees for social and economic problems.`,
  },
  {
    id: 'turkey',
    label: 'Turkey',
    lat: 39.0,
    lng: 35.0,
    region: 'Middle East',
    description: `土耳其
Kurdish people are the fourth largest ethnic group in the Middle East and the world’s largest stateless nation. They mainly live across Turkey, Iran, Iraq, and Syria. After World War I, the Treaty of Sèvres briefly proposed the possibility of Kurdish autonomy and independence, but the later Treaty of Lausanne canceled these promises and divided Kurdish populations among several states. This became the foundation of the modern Kurdish issue. For decades, many governments in the region imposed cultural restrictions, political repression, and military crackdowns on Kurdish communities, including bans on the Kurdish language and denial of Kurdish identity. In response, Kurdish groups organized nationalist movements, armed resistance, and autonomy campaigns, such as the PKK in Turkey, the Kurdish Regional Government in Iraq, and the Rojava autonomous administration in northern Syria. Kurdish forces also played a major role in the fight against ISIS. However, because of concerns over territorial integrity, oil resources, and regional politics, neighboring states strongly oppose Kurdish independence. Today, Kurdish people continue struggling for identity, self-determination, and political recognition.
庫德人 是中東第四大民族，也是世界上最大的「無國家民族」，主要分布於土耳其、伊朗、伊拉克與敘利亞。第一次世界大戰後，《色佛爾條約》曾提出庫德族自治與獨立可能，但後來《洛桑條約》取消相關承諾，導致庫德人被分割於不同國家之中，成為今日民族問題的重要起點。長期以來，許多中東國家對庫德人採取文化壓迫、政治限制與軍事鎮壓，例如限制使用庫德語、否認民族身份，甚至發生屠殺與大規模迫害。庫德人因此持續透過民族運動、武裝抗爭與自治行動爭取權利，例如土耳其的PKK、伊拉克庫德自治政府，以及敘利亞北部的「羅賈瓦」自治實驗。近年來，庫德武裝勢力也曾協助國際社會打擊ISIS。然而，由於牽涉石油資源、國家主權與國際政治，各國普遍反對庫德獨立。至今，庫德人仍持續在民族認同、自主權與國際現實之間尋求生存與未來。`,
  },
  {
    id: 'romania',
    label: 'Romania',
    lat: 45.9,
    lng: 24.9,
    region: 'Eastern Europe',
    description: `羅馬尼亞
Roma, often wrongly called “Gypsy,” are an ethnic group originating from northern India. Linguistic and genetic studies show that they migrated westward around the 9th century and gradually spread across Europe. Because of their different language, appearance, religion, and nomadic traditions, Roma people have faced centuries of discrimination and persecution. Since the 15th century, many European states expelled, enslaved, or violently targeted Roma communities. During World War II, Nazi Germany carried out the genocide of Roma people, killing an estimated 500,000 individuals in what is often called the “Forgotten Holocaust.” Even after the war, Roma communities continued to experience forced assimilation, poverty, unemployment, limited access to education, and social exclusion. Today, many Roma people in Europe still face discrimination and poor living conditions. At the same time, Roma organizations, human rights groups, and cultural institutions continue working to preserve Roma identity and fight for equality, human rights, and social inclusion.
羅姆人是源自印度北部的跨國民族，過去常被外界以帶有歧視意味的「Gypsy’（吉普賽人）」稱呼。研究顯示，他們約於9世紀離開印度，之後逐漸遷徙至歐洲各地。由於膚色、語言、宗教與生活方式不同，羅姆人長期遭受歧視與迫害，被貼上「小偷」、「骯髒」等負面標籤。自15世紀起，歐洲多國陸續驅逐、奴役甚至獵捕羅姆人。二戰期間，納粹德國更對羅姆人進行種族滅絕，約有50萬人死亡，被稱為「被遺忘的大屠殺」。戰後，羅姆人仍面臨強制同化、教育不足、失業、貧窮與社會排斥等問題。如今，歐洲仍有大量羅姆人生活在貧困與歧視之中，但他們也透過世界羅姆人大會、人權組織與文化保存行動，持續爭取平等、人權與族群認同。`,
  },
]
