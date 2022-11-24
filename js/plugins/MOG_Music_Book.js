//=============================================================================
// MOG_Music_Book.js
//=============================================================================

/*:
 * @plugindesc (v1.5) O plugin adiciona a cena Livro de Músicas.
 * @author Moghunter
 *
 * @param Command Menu
 * @desc Ativar o comando da cena de música.
 * @default true
 *
 * @param Command Word
 * @desc Definição do nome do comando.
 * @default Music Book
 *
 * @param List Fade Duration
 * @desc Tempo para dar fade na lista.
 * @default 120
 *
 * @param Completion Word
 * @desc Definição da palavra completado.
 * @default Completion
 *
 * @param Meter X-Axis
 * @desc Posição do medidor de tempo X-Axis
 * @default 90
 *
 * @param Meter Y-Axis
 * @desc Posição do medidor de tempo Y-Axis
 * @default 0 
 *
 * @param Point X-Axis
 * @desc Posição do ponteiro do tempo X-Axis
 * @default 0  
 *
 * @param Point Y-Axis
 * @desc Posição do ponteiro do tempo Y-Axis
 * @default 5  
 *
 * @param Number X-Axis
 * @desc Posição do ponteiro do tempo X-Axis
 * @default 350
 *
 * @param Number Y-Axis
 * @desc Posição do ponteiro do tempo Y-Axis
 * @default 16
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Music Book (v1.5) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * O plugin adiciona uma cena onde podem ser acessadas as músicas tocadas no
 * jogo.
 * =============================================================================
 * Para chamar o cena use o comando abaixo através do Plugin Command.
 * Por padrão a cena de Música pode ser acessada pelo Menu principal.
 *
 * music_book
 *
 * =============================================================================
 * As imagens correspondentes as músicas devem ser gravadas na pasta
 *
 * /img/musicbook/ 
 *
 * E as imagem deve ter o nome igual ao arquivo de música para aparecerem na 
 * tela.
 * =============================================================================
 * A descrição e o titulo da música devem ser feitas no arquivo 
 *
 * Music_Titles.txt
 *
 * Este arquivo deve estar gravado na pasta /Data/
 *
 * =============================================================================
 * Para configurar o script escreva estes comentários no arquivo Music_Titles.txt
 * O arquivo pode ser aberto com o programa de "Bloco de Notas" comum.
 *
 * FILE_NAME : TITLE_OF_MUSIC : DESCRIPTION : PARTICLE_NAME : PX : PY
 *
 * FILE_NAME      - Nome do arquivo da música.
 * TITLE_OF_MUSIC - Titulo da música.
 * DESCRIPTION    - Descrição da música.
 * PARTICLE_NAME  - Nome do arquivo da partícula. (Opcional)
 * PX             - Velocidade da partícula horizontal.
 * PY             - Velocidade da partícula vertical.
 *
 * Exemplo
 *
 * Battle3:Battle For Freedom:Battle Theme 3 (Rpg Maker MV)
 * Dungeon1:Empire Of Angels:Dungeon Theme 1 (Rpg Maker MV):particle_1:0:-1
 * Field1:Our Destiny:FieldTheme 1 (Rpg Maker MV)
 * 
 * =============================================================================
 * HISTÓRICO 
 * =============================================================================
 * (1.5) Correção do bug Required no modo WEB, no entanto a quantidade de músicas
 *       será baseado no setup do Plugin. 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Music_Book = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Music_Book');
    Moghunter.musicbook_command_menu = String(Moghunter.parameters['Command Menu'] || "true");
    Moghunter.musicbook_command_name = String(Moghunter.parameters['Command Word'] || "Music Book");
	Moghunter.musicbook_fade_time = Number(Moghunter.parameters['List Fade Duration'] || 120);
	Moghunter.musicbook_completion_word = String(Moghunter.parameters['Completion Word'] || "Completion");
	Moghunter.musicbook_meter_x = Number(Moghunter.parameters['Meter X-Axis'] || 90);
	Moghunter.musicbook_meter_y = Number(Moghunter.parameters['Meter Y-Axis'] || 0);
	Moghunter.musicbook_point_x = Number(Moghunter.parameters['Point X-Axis'] || 0);
	Moghunter.musicbook_point_y = Number(Moghunter.parameters['Point Y-Axis'] || 5);	
    Moghunter.musicbook_time_number_x = Number(Moghunter.parameters['Number X-Axis'] || 350);
	Moghunter.musicbook_time_number_y = Number(Moghunter.parameters['Number Y-Axis'] || 16);
	
//=============================================================================
// ** TITLES SETTING
//=============================================================================	

Moghunter.musicbook_titles = [
	["Th01Title","A Sacred Lot","Menú Principal de HRtP"],
	["Th01St1","Eternal Shrine Maiden","Tema de los niveles 1-4, Niveles infernales 16-19"],
	["SinGyoku","The Positive and Negative","Tema de SinGyoku"],
	["Th01St2A","Highly Responsive to Prayers","Tema de Makai Niveles 6-9 y tema de Créditos"],
	["Th01St2B","Eastern Strange Discourse","Tema del Infierno Niveles 6-9"],
	["YuugenMima","Angel's Legend","Tema de YuugenMagan y Mima"],
	["Th01St3A","Oriental Magician","Tema de Makai Niveles 11-14"],
	["Th01St3B","Blade of Banishment","Tema del Infierno Niveles 11-14"],
	["ElisKikuri","Magic Mirror","Tema de Elis y Kikuri"],
	["Th01St4A","Oriental Magician","Tema de Makai Niveles 16-19"],
	["SarielA","Now, Until the Moment You Die","Primer Tema de Sariel"],
	["SarielB","Civilization of Magic","Segundo Tema de Sariel"],
	["Konngara","Swordsman of a Distant Star","Tema de Konngara"],
	["Th01Ending","Iris","Tema del Final del HRtP"],
	["Th02Title","Eastern Demon-Sealing Record ~ Pure Land Mandala","Menú Principal de SoEW"],
	["Th02St1","Hakurei ~ Eastern Wind","Tema SoEW de la Etapa 1"],
	["Rika","She's in a temper!!","Tema de Rika"],
	["Th06Title","A Dream More Scarlet than Red","Menú Principal de EoSD"],
	["Th06St1","A Soul as Scarlet as a Ground Cherry","Tema EoSD de la Etapa 1"],
	["Rumia","Apparitions Stalk the Night","Tema de Rumia"],
	["Th06St2","Lunate Elf","Tema EoSD de la Etapa 2"],
	["Cirno","Tomboyish Girl in Love","Tema de Cirno"],
	["Th06St3","Shanghai Scarlet Teahouse ~ Chinese Tea","Tema EoSD de la Etapa 3"],
	["Meiling","Shanghai Alice of Meiji 17","Tema de Hong Meiling"],
	["Th06St4","Voile, the Magic Library","Tema EoSD de la Etapa 4"],
	["Patchouli","Locked Girl ~ The Girl's Sealed Room","Tema de Patchouli Knowledge"],
	["Th06St5","The Maid and the Pocket Watch of Blood","Tema EoSD de la Etapa 5"],
	["Sakuya","Lunar Clock ~ Luna Dial","Tema de Sakuya Izayoi"],
	["Th06St6","The Young Descendant of Tepes","Tema EoSD de la Etapa 6"],
	["Remilia","Septette for a Dead Princess","Tema de Remilia Scarlet"],
	["Th06Ending","An Eternity More Transient than Scarlet","Tema del Final del EoSD"],
	["Th06StEx","The Centennial Festival for Magical Girls","Tema EoSD de la Etapa Extra"],
	["Flandre","U.N. Owen was Her?","Tema de Flandre Scarlet"],
	["Th06Staff","Scarlet Tower ~ Eastern Dream...","Tema del EoSD de los Créditos"],
	["SokuChar","Memory of Forgathering Dream","Soku - 'Selección de Personajes'"],
	["PlayerScore128","Player's Score","FW - 'Tema de Puntaje'"],
	["Th18Title","A Rainbow Spanning Gensokyo","Tema UM del Menú Principal"],
	["Th18St1","A Shower of Strange Occurrences","Tema UM de la Etapa 1"],
	["Mike","Kitten of Great Fortune","Tema de Mike Goutokuji"],
	["Th18St2","The Cliff Hidden in Deep Green","Tema UM de la Etapa 2"],
	["Takane","Banditry Technology","Tema de Takane Yamashiro"],
	["Th18St3","The Perpetual Snow of Komakusa Blossoms","Tema UM de la Etapa 3"],
	["Sannyo","Smoking Dragon","Tema de Sannyo Komakusa"],
	["Th18St4","The Obsolescent Industrial Remains","Tema UM de la Etapa 5"],
	["Misumaru","Ore from the Age of the Gods","Tema de Misumaru Tamatsukuri"],
	["Th18St5","The Long-Awaited Oumagatoki","Tema UM de la Etapa 5"],
	["Megumu","Starry Mountain of Tenma","Tema de Megumu Iizunamaru"],
	["Th18St6","Lunar Rainbow","Tema UM de la Etapa 6"],
	["Chimata","Where Is That Bustling Marketplace Now ~ Immemorial Marketeers","Tema de Chimata Tenkyuu"],
	["Th18Ending","The Sunday After the Storm","Tema del Final del UM"],
	["Th18StEx","The Great Fantastic Underground Railway Network","Tema UM de la Etapa Extra"],
	["Momoyo","The Princess Who Slays Dragon Kings","Tema de Momoyo Himemushi"],
	["Th18Staff","A Rainbow-Colored World","Tema del UM de los Créditos"],
	["Th18St1Remix","Rainbow Chaser","Remix de 'A Shower de Strange Occurrences y Kitten of Great Fortune'"],
	["MikeRemix","Super Lucky Kitty","Remix de 'Kitten of Great Fortune'"],
	["Th18St3Remix","KOMAKUSA","Remix de 'The Perpetual Snow of Komakusa Blossoms'"],
	["MegumuRemix","酉ノ刻ノ大天狗","Remix de 'The Long-Awaited Oumagatoki y Starry Mountain of Tenma'"],
	["MegumuRemix2","Senpou General","Remix de 'Starry Mountain of Tenma'"],
	["ChimataRemix","Marche no Koe naki Koe","Remix de 'Where Is That Bustling Marketplace Now ~ Immemorial Marketeers'"],
	["Th18StExtraRemix","Poetic Flight","Remix de 'The Great Fantastic Underground Railway Network'"],
	["MomoyoRemix","Apocalyptic Mine Blast","Remix de 'The Princess Who Slays Dragon Kings y The Great Fantastic Underground Railway Network'"],
	["MomoyoRemix2","Dragonslayer","Remix de 'The Princess Who Slays Dragon Kings'"],
	["MomoyoRemix3","Mukade Enbu","Remix de 'The Princess Who Slays Dragon Kings'"]
];

Moghunter.musicbook_titles_en = [
	["Th01Title","A Sacred Lot","Title Screen's HRtP Theme"],
	["Th01St1","Eternal Shrine Maiden","Theme of Levels 1-4, Hell Levels 16-19"],
	["SinGyoku","The Positive and Negative","SinGyoku's HRtP Theme"],
	["Th01St2A","Highly Responsive to Prayers","Theme of Makai Levels 6-9 and Credits theme"],
	["Th01St2B","Eastern Strange Discourse","Theme of Hell Levels 6-9"],
	["YuugenMima","Angel's Legend","YuugenMagan and Mima's HRtP Theme"],
	["Th01St3A","Oriental Magician","Theme of Makai Levels 11-14"],
	["Th01St3B","Blade of Banishment","Theme of Hell Levels 11-14"],
	["ElisKikuri","Magic Mirror","Elis and Kikuri's HRtP Theme"],
	["Th01St4A","the Legend of KAGE","Theme of Makai Levels 16-19"],
	["SarielA","Now, Until the Moment You Die","Sariel 1st's HRtP Theme"],
	["SarielB","Civilization of Magic","Sariel 2nd's HRtP Theme"],
	["Konngara","Swordsman of a Distant Star","Konngara's HRtP Theme"],
	["Th01Ending","Iris","Ending Theme's HRtP Theme"],
	["Th02Title","Eastern Demon-Sealing Record ~ Pure Land Mandala","Title Screen's SoEW Theme"],
	["Th02St1","Hakurei ~ Eastern Wind","Stage 1's SoEW Theme"],
	["Rika","She's in a temper!!","Rika's Theme"],
	["Th06Title","A Dream More Scarlet than Red","Title Screen's EoSD Theme"],
	["Th06St1","A Soul as Scarlet as a Ground Cherry","Stage 1's EoSD Theme"],
	["Rumia","Apparitions Stalk the Night","Rumia's Theme"],
	["Th06St2","Lunate Elf","Stage 2's EoSD Theme"],
	["Cirno","Tomboyish Girl in Love","Cirno's Theme"],
	["Th06St3","Shanghai Scarlet Teahouse ~ Chinese Tea","Stage 3's EoSD Theme"],
	["Meiling","Shanghai Alice of Meiji 17","Hong Meiling's Theme"],
	["Th06St4","Voile, the Magic Library","Stage 4's EoSD Theme"],
	["Patchouli","Locked Girl ~ The Girl's Sealed Room","Patchouli Knowledge's Theme"],
	["Th06St5","The Maid and the Pocket Watch of Blood","Stage 5's EoSD Theme"],
	["Sakuya","Lunar Clock ~ Luna Dial","Sakuya Izayoi's Theme"],
	["Th06St6","The Young Descendant of Tepes","Stage 6's EoSD Theme"],
	["Remilia","Septette for a Dead Princess","Remilia Scarlet's Theme"],
	["Th06Ending","An Eternity More Transient than Scarlet","EoSD Ending Theme"],
	["Th06StEx","The Centennial Festival for Magical Girls","Stage Extra's EoSD Theme"],
	["Flandre","U.N. Owen was Her?","Flandre Scarlet's Theme"],
	["Th06Staff","Scarlet Tower ~ Eastern Dream...","Credits EoSD Theme"],
	["SokuChar","Memory of Forgathering Dream","Character Select's Soku Theme"],
	["PlayerScore128","Player's Score","FW - 'Score Theme'"],
	["Th18Title","A Rainbow Spanning Gensokyo","Title Screen's UM Theme"],
	["Th18St1","A Shower of Strange Occurrences","Stage 1's UM Theme"],
	["Mike","Kitten of Great Fortune","Mike Goutokuji's Theme"],
	["Th18St2","The Cliff Hidden in Deep Green","Stage 2's UM Theme"],
	["Takane","Banditry Technology","Takane Yamashiro's UM Theme"],
	["Th18St3","The Perpetual Snow of Komakusa Blossoms","Stage 3's UM Theme"],
	["Sannyo","Smoking Dragon","Sannyo Komakusa's UM Theme"],
	["Th18St4","The Obsolescent Industrial Remains","Stage 4's UM Theme"],
	["Misumaru","Ore from the Age of the Gods","Misumaru Tamatsukuri's UM Theme"],
	["Th18St5","The Long-Awaited Oumagatoki","Stage 5's UM Theme"],
	["Megumu","Starry Mountain of Tenma","Megumu Iizunamaru's UM Theme"],
	["Th18St6","Lunar Rainbow","Stage 6's UM Theme"],
	["Chimata","Where Is That Bustling Marketplace Now ~ Immemorial Marketeers","Chimata Tenkyuu's UM Theme"],
	["Th18Ending","The Sunday After the Storm","UM Ending Theme"],
	["Th18StEx","The Great Fantastic Underground Railway Network","Stage Extra's UM Theme"],
	["Momoyo","The Princess Who Slays Dragon Kings","Momoyo Himemushi's UM Theme"],
	["Th18Staff","A Rainbow-Colored World","Credits UM Theme"],
	["Th18St1Remix","Rainbow Chaser","Remix of 'A Shower of Strange Occurrences and Kitten of Great Fortune'"],
	["MikeRemix","Super Lucky Kitty","Remix of 'Kitten of Great Fortune'"],
	["Th18St3Remix","KOMAKUSA","Remix of 'The Perpetual Snow of Komakusa Blossoms'"],
	["MegumuRemix","酉ノ刻ノ大天狗","Remix of 'The Long-Awaited Oumagatoki and Starry Mountain of Tenma'"],
	["MegumuRemix2","Senpou General","Remix of 'Starry Mountain of Tenma'"],
	["ChimataRemix","Marche no Koe naki Koe","Remix of 'Where Is That Bustling Marketplace Now ~ Immemorial Marketeers'"],
	["Th18StExtraRemix","Poetic Flight","Remix of 'The Great Fantastic Underground Railway Network'"],
	["MomoyoRemix","Apocalyptic Mine Blast","Remix of 'The Princess Who Slays Dragon Kings and The Great Fantastic Underground Railway Network'"],
	["MomoyoRemix2","Dragonslayer","Remix of 'The Princess Who Slays Dragon Kings'"],
	["MomoyoRemix3","Mukade Enbu","Remix of 'The Princess Who Slays Dragon Kings'"]
];	

Moghunter.musicbook_titles_pt = [
	["Th01Title","A Sacred Lot","Tela de título de HRtP"],
	["Th01St1","Miko Eterna","Tema dos Níveis 1-4, Níveis do Inferno 16-19"],
	["SinGyoku","The Positive and Negative","Tema de SinGyoku"],
	["Th01St2A","Highly Responsive to Prayers","Tema do Makai Níveis 6-9 e tema de Créditos"],
	["Th01St2B","Eastern Strange Discourse","Tema do Inferno Níveis 6-9"],
	["YuugenMima","Angel's Legend","Tema de YuugenMagan e Mima"],
	["Th01St3A","Oriental Magician","Tema do Makai Níveis 11-14"],
	["Th01St3B","Blade of Banishment","Tema do Inferno Níveis 11-14"],
	["ElisKikuri","Magic Mirror","Tema de Elis e Kikuri"],
	["Th01St4A","the Legend of KAGE","Tema do Makai Níveis 16-19"],
	["SarielA","Now, Until the Moment You Die","Primeiro tema de Sariel"],
	["SarielB","Civilization of Magic","Segundo Tema de Sariel"],
	["Konngara","Swordsman of a Distant Star","Tema de Konngara"],
	["Th01Ending","Íris","Tema de encerramento HRtP"],
	["Th02Title","Eastern Demon-Sealing Record ~ Pure Land Mandala","Tela de título de SoEW"],
	["Th02St1","Hakurei ~ Eastern Wind","Tema SoEW da Fase 1"],
	["Rika","She's in a temper!!","Tema de Rika"],
	["Th06Title","Um Sonho Mais Escarlate que Vermelho","Tela de título de EoSD"],
	["Th06St1","Uma Alma tão Escarlate como uma Lanterna Chinesa","Tema EoSD da Fase 1"],
	["Rumia","Aparições Perseguem a Noite","Tema de Rumia"],
	["Th06St2","Elfo da Meia-Lua","Tema EoSD da Fase 2"],
	["Cirno","Maria-Rapaz Apaixonada","Tema de Cirno"],
	["Th06St3","Casa de Chá Escarlate de Xangai ~ Chá Chinêsa","Tema EoSD da Fase 3"],
	["Meiling","Xangai Alice de Meiji 17","Tema de Hong Meiling"],
	["Th06St4","Voile, a Biblioteca Mágica","Tema EoSD da Fase 4"],
	["Patchouli","Rapariga Trancada ~ O Quarto Selado da Rapariga","Tema de Patchouli Knowledge"],
	["Th06St5","A Empregada e o Relógio de Bolso Sangrento","Tema EoSD da Fase 5"],
	["Sakuya","Relógio Lunar ~ Indicador Luna","Tema de Sakuya Izayoi"],
	["Th06St6","A Jovem Descendente de Tepes","Tema EoSD da Fase 6"],
	["Remilia","Septeto para uma Princesa Morta","Tema de Remilia Scarlet"],
	["Th06Ending","Uma Eternidade mais Transitória que Escarlate","Tema de encerramento EoSD"],
	["Th06StEx","O Festival Centenário para as Raparigas Mágicas","Tema EoSD da Fase Extra"],
	["Flandre","U.N. Owen era ela?","Tema de Flandre Scarlet"],
	["Th06Staff","Torre Escarlate ~ Sonho Oriental...","Créditos Tema EoSD"],
	["SokuChar","Memória do sonho reunido","Seleção de Personagem de Soku"],
	["PlayerScore128","Pontuação do jogador","FW - 'Tema de pontuação'"],
	["Th18Title","O Arco-Íris Abrangindo Gensokyo","Tema UM da tela de título"],
	["Th18St1","Chuviscos de Ocurrências Misteriosas","Tema UM da Fase 1"],
	["Mike","Gatinha de Grande Sorte","Tema de Mike Goutokuji"],
	["Th18St2","Escarpa Escondida no Verde Intenso","Tema UM da Fase 2"],
	["Takane","Banditry Technology","Tema de Takane Yamashiro"],
	["Th18St3","Neve Perpétua das Flores de Komakusa","Tema UM da Fase 3"],
	["Sannyo","Smoking Dragon","Tema de Sannyo Komakusa"],
	["Th18St4","A Obsolescência da Indústria Antiga","Tema UM da Fase 4"],
	["Misumaru","Minério da Era dos Deuses","Tema de Misumaru Tamatsukuri"],
	["Th18St5","O Antecipado Oumagatoki","Tema UM da Fase 5"],
	["Megumu","Estrelas Cadem na Montanha de Tenma","Tema de Megumu Iizunamaru"],
	["Th18St6","Arco Lunar","Tema UM da Fase 6"],
	["Chimata","Onde Está Aquele Mercado Agitado Agora ~ Immemorial Marketeers","Tema de Chimata Tenkyuu"],
	["Th18Ending","	Domingo Após a Tempestade","Tema de encerramento UM"],
	["Th18StEx","A Ilusória Grande Rede Férrea","Tema UM da Fase Extra"],
	["Momoyo","Princesa Chacinadora de Reis Dragões","Tema de Momoyo Himemushi"],
	["Th18Staff","Um Mundo Arco-Íris","Créditos Tema UM"],
	["Th18St1Remix","Rainbow Chaser","Remix de 'Chuviscos de Ocurrências Misteriosas e Gatinha de Grande Sorte'"],
	["MikeRemix","Super Lucky Kitty","Remix de 'Kitten of Great Fortune'"],
	["Th18St3Remix","KOMAKUSA","Remix of 'Neve Perpétua das Flores de Komakusa'"],
	["MegumuRemix","酉ノ刻ノ大天狗","Remix de 'O Antecipado Oumagatoki e Estrelas Cadem na Montanha de Tenma'"],
	["MegumuRemix2","Senpou General","Remix de 'Starry Mountain of Tenma'"],
	["ChimataRemix","Marche no Koe naki Koe","Remix de 'Onde Está Aquele Mercado Agitado Agora ~ Immemorial Marketeers'"],
	["Th18StExtraRemix","Poetic Flight","Remix de 'A Ilusória Grande Rede Férrea'"],
	["MomoyoRemix","Apocalyptic Mine Blast","Remix de 'Princesa Chacinadora de Reis Dragões e A Ilusória Grande Rede Férrea'"],
	["MomoyoRemix2","Dragonslayer","Remix de 'Princesa Chacinadora de Reis Dragões"],
	["MomoyoRemix3","Mukade Enbu","Remix de 'Princesa Chacinadora de Reis Dragões'"]
];

Moghunter.musicbook_titles_jp = [
	["Th01Title","A Sacred Lot","Title Screen's HRtP Theme"],
	["Th01St1","永遠の巫女","Theme of Levels 1-4, Hell Levels 16-19"],
	["SinGyoku","The Positive and Negative","SinGyoku's HRtP Theme"],
	["Th01St2A","Highly Responsive to Prayers","Theme of Makai Levels 6-9 and Credits theme"],
	["Th01St2B","東方怪奇談","Theme of Hell Levels 6-9"],
	["YuugenMima","天使伝説","YuugenMagan and Mima's HRtP Theme"],
	["Th01St3A","Oriental Magician","Theme of Makai Levels 11-14"],
	["Th01St3B","破邪の小太刀","Theme of Hell Levels 11-14"],
	["ElisKikuri","魔鏡","Elis and Kikuri's HRtP Theme"],
	["Th01St4A","the Legend of KAGE","Theme of Makai Levels 16-19"],
	["SarielA","いざ、倒れ逝くその時まで","Sariel 1st's HRtP Theme"],
	["SarielB","Civilization of Magic","Sariel 2nd's HRtP Theme"],
	["Konngara","星幽剣士","Konngara's HRtP Theme"],
	["Th01Ending","アイリス","Ending Theme's HRtP Theme"],
	["Th02Title","東方封魔録　～ 浄土曼荼羅","Title Screen's SoEW Theme"],
	["Th02St1","博麗　～ Eastern Wind","Stage 1's SoEW Theme"],
	["Rika","She's in a temper!!","Rika's Theme"],
	["Th06Title","赤より紅い夢","Title Screen's EoSD Theme"],
	["Th06St1","ほおずきみたいに紅い魂","Stage 1's EoSD Theme"],
	["Rumia","妖魔夜行","Rumia's Theme"],
	["Th06St2","ルーネイトエルフ","Stage 2's EoSD Theme"],
	["Cirno","おてんば恋娘","Cirno's Theme"],
	["Th06St3","上海紅茶館　～ Chinese Tea","Stage 3's EoSD Theme"],
	["Meiling","明治十七年の上海アリス","Hong Meiling's Theme"],
	["Th06St4","ヴワル魔法図書館","Stage 4's EoSD Theme"],
	["Patchouli","ラクトガール　～ 少女密室","Patchouli Knowledge's Theme"],
	["Th06St5","メイドと血の懐中時計","Stage 5's EoSD Theme"],
	["Sakuya","月時計　～ ルナ・ダイアル","Sakuya Izayoi's Theme"],
	["Th06St6","ツェペシュの幼き末裔","Stage 6's EoSD Theme"],
	["Remilia","亡き王女の為のセプテット","Remilia Scarlet's Theme"],
	["Th06Ending","紅より儚い永遠","Ending Theme's EoSD Theme"],
	["Th06StEx","魔法少女達の百年祭","Stage Extra's EoSD Theme"],
	["Flandre","U.N.オーエンは彼女なのか？","Flandre Scarlet's Theme"],
	["Th06Staff","紅楼　～ Eastern Dream...","Staff Roll Theme's EoSD Theme"],
	["SokuChar","萃夢想","Character Select's Soku Theme"],
	["PlayerScore128","プレイヤーズスコア","FW - 'Score Theme'"],
	["Th18Title","虹の架かる幻想郷","Title Screen's UM Theme"],
	["Th18St1","妖異達の通り雨","Stage 1's UM Theme"],
	["Mike","大吉キトゥン","Mike Goutokuji's Theme"],
	["Th18St2","深緑に隠された断崖","Stage 2's UM Theme"],
	["Takane","バンデットリィテクノロジー","Takane Yamashiro's UM Theme"],
	["Th18St3","駒草咲くパーペチュアルスノー","Stage 3's UM Theme"],
	["Sannyo","スモーキングドラゴン","Sannyo Komakusa's UM Theme"],
	["Th18St4","廃れゆく産業遺構","Stage 4's UM Theme"],
	["Misumaru","神代鉱石","Misumaru Tamatsukuri's UM Theme"],
	["Th18St5","待ちわびた逢魔が時","Stage 5's UM Theme"],
	["Megumu","星降る天魔の山","Megumu Iizunamaru's UM Theme"],
	["Th18St6","ルナレインボー","Stage 6's UM Theme"],
	["Chimata","あの賑やかな市場は今どこに　～ Immemorial Marketeers","Chimata Tenkyuu's UM Theme"],
	["Th18Ending","嵐の後の日曜日","Ending Theme's UM Theme"],
	["Th18StEx","幻想の地下大線路網","Stage Extra's UM Theme"],
	["Momoyo","龍王殺しのプリンセス","Momoyo Himemushi's UM Theme"],
	["Th18Staff","虹色の世界","Staff Roll Theme's UM Theme"],
	["Th18St1Remix","Rainbow Chaser","Remix of '妖異達の通り雨 and 大吉キトゥン'"],
	["MikeRemix","Super Lucky Kitty","Remix de 'Kitten of Great Fortune'"],
	["Th18St3Remix","KOMAKUSA","Remix of '駒草咲くパーペチュアルスノー'"],
	["MegumuRemix","酉ノ刻ノ大天狗","Remix of '待ちわびた逢魔が時 and 星降る天魔の山'"],
	["MegumuRemix2","先鋒ジェネラル","Remix of '星降る天魔の山'"],
	["ChimataRemix","マルシェの声なき声","Remix of 'あの賑やかな市場は今どこに　～ Immemorial Marketeers'"],
	["Th18StExtraRemix","ポエティックフライト","Remix of '幻想の地下大線路網'"],
	["MomoyoRemix","Apocalyptic Mine Blast","Remix of '龍王殺しのプリンセス and 幻想の地下大線路網'"],
	["MomoyoRemix2","龍王絶対○すマン","Remix of '龍王殺しのプリンセス'"],
	["MomoyoRemix3","百足演舞","Remix of '龍王殺しのプリンセス'"]
];

//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Music Book
//==============================
ImageManager.loadmusicbook = function(filename) {
    return this.loadBitmap('img/musicbook/', filename, 0, true);
};	

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_music_book_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_music_book_pluginCommand.call(this,command, args)
	if (command === "music_book")  {$gameSystem.music_book();};
	return true;
};

//=============================================================================
// ** AudioManager
//=============================================================================	

//==============================
// * Play Bgm
//==============================
var _alias_mog_musicbook_aumngr_playBgm = AudioManager.playBgm
AudioManager.playBgm = function(bgm, pos) {
    _alias_mog_musicbook_aumngr_playBgm.call(this,bgm,pos)
	if ($gameSystem._music_list && bgm.name) {
	for (var i = 0; i < $gameSystem._music_list.length; i++) {
    if ($gameSystem._music_list[i][1] === bgm.name) {$gameSystem._music_list[i][0] = true}; 
	};};	
	$gameTemp._bgmBuffer = this._bgmBuffer;
};

//==============================
// * Stop Bgm
//==============================
var _alias_mog_musicbook_stopBgm = AudioManager.stopBgm;
AudioManager.stopBgm = function() {
    _alias_mog_musicbook_stopBgm.call(this);
	$gameTemp._bgmBuffer = null;
};

//==============================
// * Fade OutBgm
//==============================
var _alias_mog_musicbook_fadeOutBgm = AudioManager.fadeOutBgm;
AudioManager.fadeOutBgm = function(duration) {
    _alias_mog_musicbook_fadeOutBgm.call(this,duration);
	$gameTemp._bgmBuffer = null;
};

//=============================================================================
// ** Game_Temp
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alias_mog_musicbook_gtemp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_alias_mog_musicbook_gtemp_initialize.call(this);
	this._bgmBuffer = null;
};

//=============================================================================
// ** Game_System
//=============================================================================	

//==============================
// * Bgm Duration
//==============================
Game_System.prototype.bgm_duration = function(type) {
	if (!$gameTemp._bgmBuffer || !$gameTemp._bgmBuffer.isReady()) {return 0};
	var duration = $gameTemp._bgmBuffer._totalTime / $gameTemp._bgmBuffer._pitch
	if (type === 0) {duration = Math.floor(duration);}
	return duration 
};

//==============================
// * Bgm pos
//==============================
Game_System.prototype.bgm_pos = function(type) {
	if (!$gameTemp._bgmBuffer || !$gameTemp._bgmBuffer.isReady()) {return 0};
    if (type === 0) {return Math.floor($gameTemp._bgmBuffer.seek());}
	else {return $gameTemp._bgmBuffer.seek()};
};

//==============================
// * Bgm bgm_loopLength
//==============================
Game_System.prototype.bgm_loopLength = function(type) {
	if (!$gameTemp._bgmBuffer || !$gameTemp._bgmBuffer.isReady()) {return 0};
    return $gameTemp._bgmBuffer._loopStart
};

//==============================
// * Bgm Length Text
//==============================
Game_System.prototype.bgmLengthText = function() {
    var hour = Math.floor(this.bgm_duration(0) / 60 / 60);
    var min = Math.floor(this.bgm_duration(0) / 60) % 60;
    var sec = this.bgm_duration(0) % 60;
    return hour.padZero(1) + ':' + min.padZero(2) + ':' + sec.padZero(2);
};

//==============================
// * Bgm Pos Text
//==============================
Game_System.prototype.bgmPosText = function() {
    var hour = Math.floor(this.bgm_pos(0) / 60 / 60);
    var min = Math.floor(this.bgm_pos(0) / 60) % 60;
    var sec = this.bgm_pos(0) % 60;
    return hour.padZero(1) + ':' + min.padZero(2) + ':' + sec.padZero(2);
};

//==============================
// * Make Music List
//==============================
Game_System.prototype.make_music_list = function() {
	if (ConfigManager._language === 0) {
		var music_data = Moghunter.musicbook_titles;
	} else if (ConfigManager._language === 1) {
		var music_data = Moghunter.musicbook_titles_en;
	} else if (ConfigManager._language === 2) {
		var music_data = Moghunter.musicbook_titles_pt;
	} else if (ConfigManager._language === 3) {
		var music_data = Moghunter.musicbook_titles_jp;
	} else {
		var music_data = Moghunter.musicbook_titles;
	};
	//var music_data = Moghunter.musicbook_titles;
	this._music_list = [];
	for (var i = 0; i < music_data.length; i++) {
		 var e = false;
		 var t = "";
		 var h = "";
		 var pn = null;
		 var px = 0;
		 var py = 0;		 
		 if (music_data[i][0] === $dataSystem.titleBgm.name) {e = true};
	     if (music_data[i][1]) {t = music_data[i][1]};
		 if (music_data[i][2]) {h = music_data[i][2]};
		 if (music_data[i][3]) {pn = music_data[i][3]};
		 if (music_data[i][4]) {px = music_data[i][4]};
		 if (music_data[i][5]) {py = music_data[i][5]};
		 this._music_list[i] = [e,music_data[i][0],t,h,pn,px,py];
	};	
};

//==============================
// * Music Book
//==============================
Game_System.prototype.music_book = function() {
	if (!this._music_list) {return};
    SoundManager.playOk();
    SceneManager.push(Scene_Music_Book);
};

//=============================================================================
// ** Scene Map
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alias_mog_music_book_create = Scene_Map.prototype.create
Scene_Map.prototype.create = function() {
	_alias_mog_music_book_create.call(this)
	if (!$gameSystem._music_list) {$gameSystem.make_music_list();};
}

//=============================================================================
// ** Window Music List
//=============================================================================	
function Window_MusicList() {
    this.initialize.apply(this, arguments);
};

Window_MusicList.prototype = Object.create(Window_Selectable.prototype);
Window_MusicList.prototype.constructor = Window_MusicList;

//==============================
// * Initialize
//==============================
Window_MusicList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this._ismoved = false;
	this._data = $gameSystem._music_list;
	this.activate();
	this.select(0);	
	this.refresh();
};

//==============================
// * Set Top Row
//==============================
var _alias_mog_music_book_setTopRow = Window_MusicList.prototype.setTopRow;
Window_MusicList.prototype.setTopRow = function(row) {
    _alias_mog_music_book_setTopRow.call(this,row);
	this._ismoved = true;
};

//==============================
// * ScrollDown
//==============================
var _alias_mog_music_book_wm_scrollDown = Window_MusicList.prototype.scrollDown
Window_MusicList.prototype.scrollDown = function() {
   _alias_mog_music_book_wm_scrollDown.call(this);
   this._ismoved = true;
};

//==============================
// * ScrollUp
//==============================
var _alias_mog_music_book_wm_scrollUp = Window_MusicList.prototype.scrollUp
Window_MusicList.prototype.scrollUp = function() {
    _alias_mog_music_book_wm_scrollUp.call(this);
    this._ismoved = true;   
};

//==============================
// * PageDown
//==============================
var _alias_mog_music_book_wm_cursorPagedown = Window_MusicList.prototype.cursorPagedown
Window_MusicList.prototype.cursorPagedown = function() {
	_alias_mog_music_book_wm_cursorPagedown.call(this)
    this._ismoved = true; 
};

//==============================
// * PageUP
//==============================
var _alias_mog_music_book_wm_cursorPageup = Window_MusicList.prototype.cursorPageup
Window_MusicList.prototype.cursorPageup = function() {
	_alias_mog_music_book_wm_cursorPageup.call(this)
	this._ismoved = true; 
};

//==============================
// * MaxCols
//==============================
Window_MusicList.prototype.maxCols = function() {
    return 1;
};

//==============================
// * MaxItems
//==============================
Window_MusicList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * IsCurrentItemEnabled
//==============================
Window_MusicList.prototype.isCurrentItemEnabled = function(i) {
    return this._data[i][0];
};

//==============================
// * Refresh
//==============================
Window_MusicList.prototype.refresh = function() {
	this.createContents();	
	this.contents.clear();	
	this.contents.fontItalic = true;
    this.drawAllItems();
};

//==============================
// * DrawItem
//==============================
Window_MusicList.prototype.drawItem = function(i) {
    if (this._data[i]) {
		 this.changePaintOpacity(this.isCurrentItemEnabled(i));
			 var rect = this.itemRect(i);
			 rect.width -= this.textPadding();				 
			 if (this.isCurrentItemEnabled(i)) {
			     if (this._data[i][2] != "") {
				    this.drawText(this._data[i][2] , rect.x, rect.y, this.width - 60,"center");
				 }
				 else {
			       this.drawText(this._data[i][1] , rect.x, rect.y, this.width - 60,"center");
				 };
			 }
	    else {		 
			 this.drawText("????" , rect.x, rect.y, this.width - 60,"center");
		 };
         this.changePaintOpacity(1);
    };
};

//==============================
// * Process OK
//==============================
Window_MusicList.prototype.processOk = function() {
};

//==============================
// * isOKEnable
//==============================
Window_MusicList.prototype.isOkEnabled = function() {
    return true;
};

//==============================
// * processCancel
//==============================
var _alias_mog_music_book_processCancel = Window_Selectable.prototype.processCancel
Window_MusicList.prototype.processCancel = function() {
	_alias_mog_music_book_processCancel.call(this);
	AudioManager.stopBgm();
	BattleManager.replayBgmAndBgs()
};


//=============================================================================
// ** Window_MusicComp
//=============================================================================	
function Window_MusicComp() {
    this.initialize.apply(this, arguments);
}

Window_MusicComp.prototype = Object.create(Window_Base.prototype);
Window_MusicComp.prototype.constructor = Window_MusicComp;

//==============================
// * Initialize
//==============================
Window_MusicComp.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._data = $gameSystem._music_list;
	this._data_comp = [];
	for (var i = 0; i < this._data.length; i++) {
		if (this._data[i][0]) {this._data_comp.push(this._data[i])};
	};
    this.refresh();
};

//==============================
// * Refresh
//==============================
Window_MusicComp.prototype.refresh = function() {
    this.contents.clear();
	var comp = Math.floor((this._data_comp.length / this._data.length) * 100)
	var comp2 = "(" + this._data_comp.length + "/" + this._data.length + ")"	
    this.drawText(Moghunter.musicbook_completion_word + " " + comp + " % ", 0, 0, 200,"left");
	this.drawText(comp2, 0, 0, (this.width - 32),"right");
};

//=============================================================================
// ** Window Help
//=============================================================================	

//==============================
// * Set Text Rv
//==============================
Window_Help.prototype.setText_rv = function(text) {
    if (this._text !== text) {
		var words = text.split(' ');
		var text1 = "";
		var text2 = "";
		this.textWidth(text1)
		for (var i = 0; i < words.length; i++) {
			 if (this.textWidth(text1 + words[i]) < (this.width - 32)) {text1 += words[i] + " " }
		     else {text2 += words[i] + " "};			 
		};
        this._text = text;
        this.contents.clear();
		this.drawText(text1,0,0,(this.width - 32));
		this.drawText(text2,0,this.lineHeight(),(this.width - 32));
    };
};

if (String(Moghunter.musicbook_command_menu) === "true") {
//=============================================================================
// ** Window MenuCommand
//=============================================================================	

//==============================
// * make Command List
//==============================
var _alias_mog_music_book_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_alias_mog_music_book_addOriginalCommands.call(this);
	this.addMusicBook();
};
	
//==============================
// * Add Music Book
//==============================	
Window_MenuCommand.prototype.addMusicBook = function() {
    this.addCommand(String(Moghunter.musicbook_command_name), 'music_book', true);
};	
	
//=============================================================================
// ** Scene Menu
//=============================================================================	

//==============================
// * create Command Window
//==============================
var _alias_mog_music_book_reateCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_alias_mog_music_book_reateCommandWindow.call(this); 
    this._commandWindow.setHandler('music_book',      this.commandMusicBook.bind(this));
	this._commandWindow.height -= this._commandWindow.itemHeight();  
};

//==============================
// * Music Book
//==============================
Scene_Menu.prototype.commandMusicBook = function() {
	if (!$gameSystem._music_list) {return};
    SceneManager.push(Scene_Music_Book);
};

};

//=============================================================================
// ** Scene Music Book
//=============================================================================	
function Scene_Music_Book() {
    this.initialize.apply(this, arguments);
}
Scene_Music_Book.prototype = Object.create(Scene_Base.prototype);
Scene_Music_Book.prototype.constructor = Scene_Music_Book;

//==============================
// * Initialize
//==============================
Scene_Music_Book.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	BattleManager.saveBgmAndBgs();
	AudioManager.fadeOutBgm(1);
	AudioManager.stopBgs();
	this._playing_index = -1;
	this._bgmPos_old = -1;
	this._bgmduration_old = -1;
	this._data = $gameSystem._music_list;
	this._cover_fade = false;
	this._fade_time = Math.max(Moghunter.musicbook_fade_time,1);	
    this.create_backgrounds();
	this.create_particles();
	this.create_position();
	this.create_number_time();
    this.create_window_music_list();
    this.create_window_comp();		  
    this.create_window_help();
	for (var i = 0; i < this._sprite_particles.length; i++) {
		this.reset_particles(i);
	};
};

//==============================
// * Music
//==============================
Scene_Music_Book.prototype.music = function() {
	if (!this._w_music_list) {return null}
	return this._data[this._w_music_list._index];
};

//==============================
// * Create Window Music List
//==============================
Scene_Music_Book.prototype.create_backgrounds = function() {
	this._background = new Sprite(ImageManager.loadmusicbook("Music_Book_A"));
	this.addChild(this._background);
	this._cover = new Sprite();
    this._cover.anchor.x = 0.5;
    this._cover.anchor.y = 0.5;	
	this.addChild(this._cover);	
};

//==============================
// * Create Particles
//==============================
Scene_Music_Book.prototype.create_particles = function() {	
	this._sprite_particles = [];
	this._sprite_particles_data = [];	
    for (i = 0; i < 30; i++) {
	  this._sprite_particles.push(new Sprite());
	  this.addChild(this._sprite_particles[i]);
	  this._sprite_particles_data[i] = []	  
	  this.reset_particles(i);
	  this._sprite_particles[i].x = Math.floor((Math.random() * Graphics.boxWidth));
	  this._sprite_particles[i].y = Math.floor((Math.random() * Graphics.boxHeight));
	  this._sprite_particles[i].opacity = 0;
	  this._sprite_particles[i].blendMode = 1;
    };
};
	
//==============================
// * Refresh Particles
//==============================
Scene_Music_Book.prototype.refresh_particles = function() {
   if (!this.music()[4]) {return};
   for (i = 0; i < this._sprite_particles.length; i++){
	   this._sprite_particles[i].bitmap = ImageManager.loadmusicbook(String(this.music()[4]));
	   this.reset_particles(i);
       this._sprite_particles[i].x = Math.floor((Math.random() * Graphics.boxWidth));
	   this._sprite_particles[i].y = Math.floor((Math.random() * Graphics.boxHeight));	   
   };
};

//==============================
// * Clear Particles
//==============================
Scene_Music_Book.prototype.clear_particles = function() {
   for (i = 0; i < this._sprite_particles.length; i++){
	   this._sprite_particles[i].bitmap = null;
   };
};

//==============================
// * Reset Particles
//==============================	
Scene_Music_Book.prototype.reset_particles = function(i) {	
    if (!this.music()) {return};
	this._sprite_particles_data[i][0] = Math.floor((Math.random() * 2) * this.music()[5])
	this._sprite_particles_data[i][1] = Math.floor((Math.random() * 2) * this.music()[6])
	this._sprite_particles_data[i][2] = ((Math.random() * Moghunter.title_particle_a));
	this._sprite_particles[i].opacity = 0;
	this._sprite_particles[i].x = Math.floor((Math.random() * Graphics.boxWidth));
	var pz = ((Math.random() * 0.5) * 1);
	this._sprite_particles[i].scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	if (Moghunter.title_particle_sy < 0) { 
	    this._sprite_particles[i].y = Graphics.boxHeight + this._sprite_particles[i].height * 2;
	}
	else if (Moghunter.title_particle_sy > 0)
	{
		this._sprite_particles[i].y = -this._sprite_particles[i].height * 2;
	}
	else {
	    this._sprite_particles[i].y = Math.floor((Math.random() * Graphics.boxHeight));
    }
	if (this._sprite_particles_data[i][0] == 0 && this._sprite_particles_data[i][1] == 0) {
        this._sprite_particles[i].x = -this._sprite_particles[i].width * 5;
		this._sprite_particles_data[i][0] = 9999;
		this._sprite_particles_data[i][1] = 9999;
	};
};

//==============================
// * Reset Particles C
//==============================	
Scene_Music_Book.prototype.reset_particles_c = function(i) {
	if (!this._sprite_particles_data) {return false};
	if (this._sprite_particles[i].x < -this._sprite_particles[i].width * 2 || this._sprite_particles[i].x > Graphics.boxWidth + this._sprite_particles[i].width * 2) {return true};
	if (this._sprite_particles[i].y < -this._sprite_particles[i].height * 2 || this._sprite_particles[i].y > Graphics.boxHeight + this._sprite_particles[i].height * 2 ) {return true};
	return false;
};

//==============================
// * Update Particles
//==============================
Scene_Music_Book.prototype.update_particles = function() {	
   if (!this._sprite_particles_data) {return}
   for (var i = 0; i < this._sprite_particles.length; i++) {
        this._sprite_particles[i].x += this._sprite_particles_data[i][0];
		this._sprite_particles[i].y += this._sprite_particles_data[i][1];
		this._sprite_particles[i].opacity += 2;
		this._sprite_particles[i].rotation += this._sprite_particles_data[i][2];
    	if (this.reset_particles_c(i)) { this.reset_particles(i);};
	};
};

//==============================
// * Create Number Time
//==============================
Scene_Music_Book.prototype.create_number_time = function() {
      this._number_refresh = 0;
	  this._number_pos_data = [Moghunter.musicbook_time_number_x,Moghunter.musicbook_time_number_y];
      this._sprite_number = new Sprite(new Bitmap(300,32))
	  this._sprite_number.x = this._number_pos_data[0];
	  this._sprite_number.y = this._number_pos_data[1];
	  this.addChild(this._sprite_number);
	  this.refresh_number();
};

//==============================
// * Refresh Number
//==============================
Scene_Music_Book.prototype.refresh_number = function() {
	this._bgmPos_old = $gameSystem.bgm_pos(0);
	this._bgmduration_old = $gameSystem.bgm_duration(0);
	this._sprite_number.bitmap.clear();
	var text = $gameSystem.bgmPosText() + " : " + $gameSystem.bgmLengthText();
	this._sprite_number.bitmap.drawText(String(text),0,0,300,32,'center');
};

//==============================
// * Create Position
//==============================
Scene_Music_Book.prototype.create_position = function() {
      this._position_data = [Moghunter.musicbook_meter_x,Moghunter.musicbook_meter_y,-1,
	  Moghunter.musicbook_point_x,Moghunter.musicbook_point_y,0,0,0];
      this._sprite_pos_4 = new Sprite(ImageManager.loadmusicbook("Music_Book_B"))
	  this._sprite_pos_4.x = this._position_data[0];
	  this._sprite_pos_4.y = this._position_data[1];
	  this.addChild(this._sprite_pos_4);		  
      this._sprite_pos_1 = new Sprite(ImageManager.loadmusicbook("Music_Book_B"))
	  this._sprite_pos_1.x = this._position_data[0];
	  this._sprite_pos_1.y = this._position_data[1];
	  this.addChild(this._sprite_pos_1);
      this._sprite_pos_3 = new Sprite(ImageManager.loadmusicbook("Music_Book_B"))
	  this._sprite_pos_3.x = this._position_data[0];
	  this._sprite_pos_3.y = this._position_data[1];
	  this.addChild(this._sprite_pos_3);	  
      this._sprite_pos_2 = new Sprite(ImageManager.loadmusicbook("Music_Book_C"))
	  this._position_data[5] = this._position_data[0] + this._position_data[3];
	  this._sprite_pos_2.x = this._position_data[5];
	  this._sprite_pos_2.y = this._position_data[1] + this._position_data[4];
	  this._sprite_pos_2.anchor.x = 0.5;
	  this._sprite_pos_2.anchor.y = 0.5;
	  this.addChild(this._sprite_pos_2);	  
};

//==============================
// * Create Position
//==============================
Scene_Music_Book.prototype.refresh_position_data = function() {
	this._position_data[6] = this._sprite_pos_1.bitmap.height / 3;
	this._position_data[2] = this._sprite_pos_1.bitmap.width;
	this._position_data[1] -= this._position_data[6] + this._w_music_list.height;
	this._sprite_pos_1.setFrame(0,0, this._position_data[2], this._position_data[6]);
};

//==============================
// * Update Meter
//==============================
Scene_Music_Book.prototype.update_meter = function() {
    this._sprite_pos_3.setFrame(0,this._position_data[6], this.m_rate, this._position_data[6]);
	var loop_range = this._position_data[2] * $gameSystem.bgm_loopLength() / $gameSystem.bgm_duration(1);
	this._sprite_pos_4.setFrame(0,this._position_data[6] * 2, loop_range, this._position_data[6]);
};

//==============================
// * Set M Rate
//==============================
Scene_Music_Book.prototype.set_m_rate = function() {
	return this._position_data[2] * $gameSystem.bgm_pos(1) / $gameSystem.bgm_duration(1);
};

//==============================
// * Update Position
//==============================
Scene_Music_Book.prototype.update_position = function() {
    this._sprite_pos_2.x = this._position_data[5] + this.m_rate;
};

//==============================
// * Create Window Music List
//==============================
Scene_Music_Book.prototype.create_window_music_list = function() {
    var w = Graphics.boxWidth;
    var h = 180;	
    var x = 0;
    var y = Graphics.boxHeight - h;	
	this._w_music_list = new Window_MusicList(x,y,w,h);
	this._w_music_list.setHandler('cancel',   this.popScene.bind(this));	
	this.addChild(this._w_music_list);
	this._fade = [0,0,Graphics.height + 72,
	              Graphics.height - this._w_music_list.height];	
}; 

//==============================
// * Create Window Comp
//==============================
Scene_Music_Book.prototype.create_window_comp = function() {
    var w = Graphics.boxWidth;
    var h = 72;	
    var x = 0;
    var y = this._w_music_list.y - h
	this._w_music_comp = new Window_MusicComp(x,y,w,h)
	this.addChild(this._w_music_comp);
	this._fade2 = [0,0,this._fade[2] - this._w_music_comp.height,
	              this._fade[3] - this._w_music_comp.height];		
};
	
//==============================
// * Initialize
//==============================
Scene_Music_Book.prototype.create_window_help = function() {
    this._helpWindow = new Window_Help();
	this._helpWindow.contents.fontItalic = true;
    this.addChild(this._helpWindow);
};

//==============================
// * Refresh Music
//==============================
Scene_Music_Book.prototype.refresh_music = function() {
	this._number_refresh = 0;
	if (!this.music()[0]) {this.nodata_effect();return};		
	SoundManager.playOk();
	if (this._playing_index === this._w_music_list._index) {return;};
	var text = this.music()[2] + " - " + this.music()[3];
	this._helpWindow.setText_rv(text);
    this.refresh_cover();
	this.play_music();
	this._playing_index = this._w_music_list._index;
    this.clear_particles();
    this.refresh_particles();	
};

//==============================
// * No Data Effect
//==============================
Scene_Music_Book.prototype.nodata_effect = function() {
   SoundManager.playBuzzer();
   this._cover_fade = true;
   this.clear_particles();
   this._helpWindow.setText_rv("");
   AudioManager.stopBgm();
   this._playing_index = this._w_music_list._index;
};

//==============================
// * Refresh Cover
//==============================
Scene_Music_Book.prototype.refresh_cover = function() {	
	var file_name = String(this.music()[1]) + ".png"
	var path = "img/musicbook/"
	this._cover_fade = false;
	this._cover.bitmap = ImageManager.loadmusicbook(this.music()[1])
	this._cover.opacity = 0;
	this._cover.scale.x = 1.5;
	this._cover.scale.y = this._cover.scale.x;
	this._cover.x = Graphics.width / 2;
	this._cover.y = Graphics.height / 2;
};

//==============================
// * Play Music
//==============================
Scene_Music_Book.prototype.play_music = function() {  	
	var bgm = [];
	bgm.name = this.music()[1];	bgm.volume = 100;bgm.pitch = 100;bgm.pan = 0;
 	AudioManager.playBgm(bgm,0);
};

//==============================
// * Need Refresh
//==============================
Scene_Music_Book.prototype.need_refresh = function() {  
     if (this._w_music_list._ismoved) {return true};
     if (TouchInput.isTriggered()) {return true};
     if (Input.isTriggered("ok")) {return true};
     if (Input.isTriggered('up')) {return true}; 
	 if (Input.isTriggered('right')) {return true};
	 if (Input.isTriggered('left')) {return true};
	 if (Input.isTriggered('down')) {return true};
     return false;
};

//==============================
// * Update Window
//==============================
Scene_Music_Book.prototype.update_window = function() {  
	if (this._fade[0] > 0){this._fade[0] -= 1};
	if (this.need_refresh()) {this._fade[0] = this._fade_time}
	if (this._fade[0] === 0) {	
		this._w_music_list.y += 5;
		this._w_music_comp.y += 5;
		this._w_music_list.opacity -= 5;
		if (this._w_music_list.y > this._fade[2]) {this._w_music_list.y = this._fade[2];};
		if (this._w_music_comp.y > this._fade2[2]) {this._w_music_comp.y = this._fade2[2];};
	}
	else { 
	    this._w_music_list.y -= 15;
		this._w_music_comp.y -= 15;
		this._w_music_list.opacity += 10;
		if (this._w_music_list.y < this._fade[3]) {this._w_music_list.y = this._fade[3];};
		if (this._w_music_comp.y < this._fade2[3]) {this._w_music_comp.y = this._fade2[3];};
   };
   if (this._cover_fade ) {this._cover.opacity -= 5;}
   else {this._cover.opacity += 5;};
   this._w_music_list._ismoved = false;
   this._w_music_list.contentsOpacity = this._w_music_list.opacity;
   this._w_music_comp.opacity = this._w_music_list.opacity;
   this._w_music_comp.contentsOpacity = this._w_music_list.opacity;
   this._helpWindow.opacity = this._w_music_list.opacity;
   if (this._cover.scale.x > 1.00) {this._cover.scale.x -= 0.01}
   this._cover.scale.y = this._cover.scale.x;
   this._sprite_pos_1.y = this._w_music_list.y + this._position_data[1];
   this._sprite_pos_2.y = this._sprite_pos_1.y + this._position_data[4];
   this._sprite_pos_3.y = this._sprite_pos_1.y;
   this._sprite_pos_4.y = this._sprite_pos_3.y + this._position_data[6] / 2;
   this._sprite_number.x = this._number_pos_data[0] + this._sprite_pos_1.x;
   this._sprite_number.y = this._number_pos_data[1] + this._sprite_pos_1.y;   
}; 
  
//==============================
// * Need Refresh Number
//==============================
Scene_Music_Book.prototype.need_refresh_number = function() { 
	if (this._bgmPos_old != $gameSystem.bgm_pos(0)) {return true};
	if (this._bgmduration_old != $gameSystem.bgm_duration(0)) {return true};
	return false;
};

//==============================
// * Update
//==============================
Scene_Music_Book.prototype.update = function() {   
    Scene_Base.prototype.update.call(this);	
	if (!this.music()) {return};
	this._number_refresh += 1
	this.m_rate = this.set_m_rate();
	if (this.need_refresh_number()) {this.refresh_number();this._number_refresh = 0};
	if (Input.isTriggered("ok") || (TouchInput.isTriggered() && this._w_music_list.isTouchedInsideFrame())) {this.refresh_music()};
    if (this._position_data[2] === -1 && this._sprite_pos_1.bitmap.isReady()) {this.refresh_position_data()};
	if (this._position_data[2] > -1) {this.update_position()};
	this.update_particles();
	this.update_meter();
    this.update_window();
};
