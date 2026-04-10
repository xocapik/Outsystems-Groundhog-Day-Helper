// Groundhog Day Helper - Content Script (runs in MAIN world via manifest.json)

(function () {
    console.log("[GHD Helper] Extension Loaded");

    // --- Book Database (200+ titles) ---
    const bookDb = {
        "48392017": "Don Quixote", "57281463": "Pride and Prejudice", "61950482": "1984", "70491826": "To Kill a Mockingbird",
        "83510294": "The Great Gatsby", "29174838": "Moby Dick", "94057218": "War and Peace", "18850394": "The Catcher in the Rye",
        "68291647": "Crime and Punishment", "37480612": "The Lord of the Rings", "50918576": "The Hobbit", "82140795": "Ulysses",
        "46029183": "Jane Eyre", "91735620": "Wuthering Heights", "23840196": "The Odyssey", "78430512": "The Iliad",
        "69512780": "Brave New World", "32066491": "Fahrenheit 451", "86450927": "Anna Karenina", "47129058": "The Brothers Karamazov",
        "90813476": "Les Misérables", "61359742": "The Divine Comedy", "75291834": "Harry Potter and the Sorcerer's Stone",
        "19486725": "The Lion, the Witch and the Wardrobe", "56028318": "The Alchemist", "82941880": "The Little Prince",
        "30174882": "Dracula", "94720516": "Frankenstein", "68417039": "The Picture of Dorian Gray", "12599694": "A Tale of Two Cities",
        "79340126": "Great Expectations", "48291057": "The Grapes of Wrath", "65031894": "Of Mice and Men", "91460283": "The Old Man and the Sea",
        "36890571": "One Hundred Years of Solitude", "72048136": "Love in the Time of Cholera", "59137820": "The Sound and the Fury",
        "84820915": "Slaughterhouse-Five", "23059748": "The Hitchhiker's Guide to the Galaxy", "97541802": "Dune",
        "40681295": "The Name of the Rose", "68973041": "The Shining", "18349280": "It", "72059346": "The Handmaid's Tale",
        "93480517": "The Road", "51820486": "Gone with the Wind", "26097418": "Rebecca", "84715932": "The Count of Monte Cristo",
        "39069421": "The Three Musketeers", "35597464": "The Girl with the Dragon Tattoo", "18240975": "The Da Vinci Code",
        "64927150": "The Hunger Games", "93740582": "The Fault in Our Stars", "28415097": "The Book Thief", "51603928": "Life of Pi",
        "80317465": "The Kite Runner", "47293180": "The Chronicles of Narnia", "69021437": "The Giver", "31580842": "The Maze Runner", "31590842": "The Maze Runner",
        "94783106": "Ender's Game", "52841973": "A Game of Thrones", "76635460": "The Fellowship of the Ring", "74921846": "The Two Towers",
        "85057449": "The Return of the King", "29681307": "The Color Purple", "20525389": "Beloved", "98103399": "The Stranger",
        "63554673": "Lolita", "89410356": "Catch-22", "23081569": "The Sun Also Rises",
        "58920481": "A Clockwork Orange", "40859127": "The Metamorphosis", "91237680": "The Call of the Wild", "17630894": "White Fang",
        "63549212": "The Scarlet Letter", "24097563": "Sense and Sensibility", "89153420": "Middlemarch", "50738619": "Invisible Man",
        "36480275": "The Jungle", "91864303": "The Outsiders", "40531356": "The Bell Jar", "75290418": "Atlas Shrugged",
        "62978105": "The Fountainhead", "14356092": "The Secret Garden", "87045156": "Little Women", "39581510": "The Wind in the Willows",
        "69699119": "Trees We Listen", "63011346": "Little", "85337072": "The Foundation Ring", "46091827": "The War of the Worlds",
        "73514086": "Heart of Darkness", "29846071": "The Old Curiosity Shop", "61092753": "The Hound of the Baskervilles",
        "85430962": "Sherlock Holmes: A Study in Scarlet", "17049538": "The Importance of Being Earnest", "94671380": "Animal Farm",
        "38260915": "The Road to Wigan Pier", "70913846": "Things Fall Apart", "52806491": "The Master and Margarita",
        "61028673": "The Stranger in the Woods", "89247105": "The Silmarillion", "37492061": "The Road Less Traveled",
        "90597264": "The Catcher Was a Spy", "46170838": "The Shadow of the Wind", "89740195": "The Glass Castle",
        "59028417": "The Left Hand of Darkness", "71480382": "The Martian Chronicles", "92640275": "The Old Testament",
        "58274910": "The New Testament", "40196557": "The Art of War", "67820394": "Meditations", "92017463": "The Prince",
        "34786012": "The Republic", "86540279": "The Canterbury Tales", "20847586": "The Decameron", "78120489": "The Aeneid",
        "45687021": "Paradise Lost", "93017482": "Beowulf", "66420597": "The Tale of Genji", "51440936": "The Stranger Beside Me",
        "74280195": "The Things They Carried", "39517064": "The Outsider", "86034971": "The House of the Spirits",
        "47182093": "The Poisonwood Bible", "92450317": "The Secret History", "60594827": "The Stand", "18354972": "The Girl Who Drank the Moon",
        "75928416": "The Ocean at the End of the Lane", "40851297": "The Night Circus", "93872041": "The Goldfinch",
        "57041862": "The Book of Lost Things", "81426095": "The Neverending Story", "34820571": "The Shadowhunter Chronicles",
        "62091784": "The Girl Who Played with Fire", "78183025": "The Girl Who Kicked the Hornet's Nest", "45881706": "The Mist",
        "90326417": "The Colour of Magic", "17495280": "Mort", "63820549": "Good Omens", "82094617": "The Boy in the Striped Pyjamas",
        "49571823": "The Book of Eli", "73620491": "The Long Walk", "28470196": "The City of Ember", "90735184": "The Last Unicorn",
        "56892047": "The House on the Cerulean Sea", "34176902": "The Song of Achilles", "79531084": "The Midnight Library",
        "68291547": "Crime and Punishment", "35096218": "The Trial", "51820496": "Gone with the Wind", "68420597": "The Tale of Genji",
        "93672041": "The Goldfinch", "84620915": "Slaughterhouse-Five", "34920571": "The Shadowhunter Chronicles", "23081549": "The Sun Also Rises",
        "61534673": "Lolita"
    };

    const fallbacks = {
        "CallPlayground": "CcoZJBiKGlmhY9Z8enWEUA",
        "ResolvePuzzle": "6W6big7iugSa_ureijdlvw",
        "Move": "yR8MOxZwjE6SsKT_Knadhw",
        "StartNewGame": "1JCHRkttZiZjY8C_RRS7kw",
        "FoundEasterEgg": "bY8v0x_ZosyFjl3uoA842w",
        "PlaygroundChat_SendMessage": "Pfg3qYZQqf5xiandY3Zd5A",
        "BarChat_SendMessage": "3Xx_bNkJ7ffXEKo9A0CbFg",
        "PassTime": "JEfQyOe2W1FuaSChljg+Xw",
        "Get_Context": "d96qE4M_rFikBgIpqEoJMA"
    };

    // Configuración del Loop V3
    const LOOP_V3_KEY = "ghd_loop_v3_active";
    const LOOP_V3_COUNT_KEY = "ghd_loop_v3_count";
    const MAX_RUNS_BEFORE_RELOAD = 3;

    let isLoopV3Active = localStorage.getItem(LOOP_V3_KEY) === "true";
    let loopV3Count = parseInt(localStorage.getItem(LOOP_V3_COUNT_KEY) || "0");

    // Configuración del Loop V4
    const LOOP_V4_KEY = "ghd_loop_v4_active";
    const LOOP_V4_COUNT_KEY = "ghd_loop_v4_count";
    let isLoopV4Active = localStorage.getItem(LOOP_V4_KEY) === "true";
    let loopV4Count = parseInt(localStorage.getItem(LOOP_V4_COUNT_KEY) || "0");

    // --- Alert Handling ---
    const originalAlert = window.alert;
    function suppressAlerts() {
        console.log("[GHD Helper] Suppressing alerts for Loop V3");
        window.alert = function (msg) {
            console.log(`[GHD Helper] Suppressed Alert: ${msg}`);
            updateLog(`⚠️ Alerta suprimida: ${msg}`);
        };
    }

    function restoreAlerts() {
        console.log("[GHD Helper] Restoring alerts");
        window.alert = originalAlert;
    }

    if (isLoopV3Active || isLoopV4Active) {
        suppressAlerts();
    }

    let moduleVersion = null;

    let idGame = null;

    //config
    let easterEggEnabled = true;
    let modo = 2;
    // --- Utility Functions ---
    let speedrunStartTime = null; // Track speedrun start for relative timestamps

    function updateLog(msg) {
        const log = document.getElementById('ghd-log');
        let timestamp = "";
        if (speedrunStartTime) {
            const elapsed = ((performance.now() - speedrunStartTime) / 1000).toFixed(2);
            timestamp = `[${elapsed}s] `;
        }
        if (log) log.innerText = timestamp + msg;
        console.log("[GHD Helper]", timestamp + msg);
    }

    function getCsrfToken() {
        const tokenStart = document.cookie.split('; ').find(row => row.startsWith('nr2='));
        return tokenStart ? tokenStart.split('=')[1] : "";
    }

    function getPlayerGuid() {
        return localStorage.getItem("$OS_Users$GroundhogDay$ClientVars$PlayerGUID");
    }



    // --- Generic API Handler ---
    async function getApiVersion(apiShortName) {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        for (const script of scripts) {
            if (script.src && script.src.includes(location.origin)) {
                try {
                    const resp = await fetch(script.src);
                    const text = await resp.text();
                    const regex = new RegExp(`ServiceAPI${apiShortName}"\\s*,\\s*"([^"]+)"`);
                    const match = regex.exec(text);
                    if (match && match[1]) {
                        console.log(`[GHD Helper] Found version for ${apiShortName}: ${match[1]}`);
                        return match[1];
                    }
                } catch (e) { /* ignore */ }
            }
        }
        return null;
    }

    function getAuthToken() {
        try {
            const rawToken = localStorage.getItem("os-runtime-token");
            if (!rawToken) return null;

            const tokenData = JSON.parse(rawToken);
            return tokenData.access_token ? `Bearer ${tokenData.access_token}` : null;
        } catch (e) {
            console.error("Error al obtener el token del localStorage", e);
            return null;
        }
    }

    async function callApi(apiName, inputParams = {}) {
        updateLog(`Ejecutando ${apiName} ${JSON.stringify(inputParams)} ...`);

        try {
            const playerGuid = getPlayerGuid();
            if (!playerGuid) throw new Error("PlayerGUID no encontrado");

            // Get Module Version
            if (!moduleVersion) {
                const appInfoKey = Object.keys(localStorage).find(k => k.endsWith("ApplicationInfo"));
                if (appInfoKey) {
                    const appInfo = JSON.parse(localStorage.getItem(appInfoKey));
                    moduleVersion = appInfo?.manifest?.versionToken;
                }

                if (!moduleVersion) throw new Error("ModuleVersion no encontrado");
            }

            // Get API Version


            let apiVersion = fallbacks[apiName];

            if (!apiVersion) throw new Error("API Version no encontrada para " + apiName);

            const authToken = getAuthToken();
            if (!authToken) {
                console.warn("⚠️ No se encontró token de acceso. La petición podría fallar.");
            }

            // Build Payload

            const finalInput = { ...inputParams };
            if (apiName === "CallPlayground") {
                finalInput.PlayerGUID = playerGuid;
                finalInput.Cypher = "";
            } else {
                if (!finalInput.PlayerGuid && !finalInput.PlayerGUID) {
                    finalInput.PlayerGUID = playerGuid;
                    finalInput.PlayerGuid = playerGuid;
                }
            }


            const payload = {
                versionInfo: { moduleVersion, apiVersion },
                viewName: "MainFlow.Town",
                inputParameters: finalInput
            };

            // URL Routing
            let flowName = "Town";
            if (apiName === "PlaygroundChat_SendMessage") flowName = "Babychat";
            if (apiName === "BarChat_SendMessage") flowName = "Billchat";
            if (apiName === "CallPlayground") flowName = "SolveWithAI";
            if (apiName === "Get_Context") flowName = "";

            const urlPath = flowName
                ? `/GroundhogDay/screenservices/GroundhogDay/MainFlow/${flowName}/ServiceAPI${apiName}`
                : `/GroundhogDay/screenservices/GroundhogDay/ServiceAPI${apiName}`;

            // Definimos los headers base
            const headers = {
                "Content-Type": "application/json; charset=UTF-8"
            };

            // Añadimos Authorization solo si es la API específica
            if (apiName === "CallPlayground" || apiName === "PlaygroundChat_SendMessage") {
                headers["Authorization"] = authToken;
            } else {
                headers["X-CSRFToken"] = getCsrfToken();
            }

            const res = await fetch(urlPath, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload),
                credentials: "include"
            });

            const contentType = res.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
            } else {
                // Si no es JSON, lo obtenemos como texto
                const rawText = await res.text();
                try {
                    // Intentamos parsearlo por si acaso es un JSON mal identificado
                    data = JSON.parse(rawText);
                } catch (e) {
                    // Si falla, devolvemos un objeto con el texto para mantener consistencia
                    data = { value: rawText };
                }
            }
            console.log(`[GHD Helper] ${apiName} Response:`, data);

            if (!res.ok || data.exception) {
                throw new Error(data.exception?.message || `HTTP ${res.status}`);
            }

            updateLog(`✅ ${apiName} OK`);
            return data;

        } catch (e) {
            console.error(`[GHD Helper] ${apiName} Error:`, e);
            updateLog(`❌ ${apiName}: ${e.message}`);
            throw e;
        }
    }

    // --- Direct REST API for Baby Chat (faster) ---
    async function callBabyApiDirect(userInput) {
        const playerGuid = getPlayerGuid();

        if (!playerGuid) throw new Error("PlayerGUID no encontrado");

        const headers = {
            "Content-Type": "application/json; charset=UTF-8"
        };
        headers["Authorization"] = getAuthToken();

        const res = await fetch("https://dev-advocacy-magic.outsystems.app/PunxEngine/rest/Character/Baby", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                UserInput: userInput,
                SessionId: idGame,
                PlayerGUID: playerGuid
            })
        });

        const data = await res.text(); // API returns plain text
        console.log("[GHD Helper] Baby REST API Response:", data);
        return data;
    }

    // --- Parse baby response to get digit4 ---
    function parseBabyResponse(babyRes) {
        // Handle both string (from REST API) and object (from game API)
        const babyResp = (typeof babyRes === 'string' ? babyRes : (babyRes?.Response || babyRes?.data?.Response || ""))
            .replace(/[-/]/g, " ")   // Reemplaza guiones y barras por espacios
            .replace(/\s+/g, " ")    // Reemplaza CUALQUIER cantidad de espacios seguidos por uno solo
            .trim()                  // Limpia espacios al inicio y al final
            .toLowerCase();
        if (babyResp.includes("sse ga rre o") || babyResp.includes("sse ga rr o") || babyResp.includes("sasa ga rre o")) return "0";
        if (babyResp.includes("ta wo") || babyResp.includes("ta wu") ||
            babyResp.includes("ta wug o")) return "2";
        if (babyResp.includes("ta hah rre ga ga")) return "3";
        if (babyResp.includes("fufu o uu rre") || babyResp.includes("fu o uu rre") || babyResp.includes("o fufu")) return "4";
        if (babyResp.includes("fufu i vava g")) return "5";
        if (babyResp.includes("sasa i bgw") ||
            babyResp.includes("sasai bgw") ||
            babyResp.includes("sasape") ||
            babyResp.includes("sasa pe") ||
            babyResp.includes("sasasi bgw")) return "6";
        if (babyResp.includes("sasa ga vava ga nana") || babyResp.includes("sasag vava g nana")) return "7";
        if (babyResp.includes("ga i gugu hah ta") ||
            babyResp.includes("ga i guguuguuh ta") ||
            babyResp.includes("ga i gu hah ta") ||
            babyResp.includes("ga i gu hah ta") ||
            babyResp.includes("rre i ga dada")) return "8";
        if (babyResp.includes("nana i nana ga") ||
            babyResp.includes("i nana") ||
            babyResp.includes("nana i")) return "9";
        if (babyResp.includes("o nana ga") || babyResp.includes("o nana") || babyResp.includes("nana ga")) return "1";
        return null;
    }

    // --- THE ULTIMATE AUTO-SOLVE ---
    async function runAutomatedPuzzle() {
        console.log("[GHD Helper] runAutomatedPuzzle called!");

        updateLog("🤖 INICIANDO SPEEDRUN...");
        let digit1 = null, digit2 = null, digit3 = null, digit4 = null;
        let billCode = null;
        let hora = null;

        // Promises for background chat calls
        let babyPromise = null;
        let billPromise = null;

        // ⏱️ Start timer
        const startTime = performance.now();
        speedrunStartTime = startTime; // For log timestamps

        try {
            // === PHASE 1: START + BABY (background) ===
            updateLog("📍 Fase 1: Iniciando juego...");

            res = await callApi("StartNewGame", {})
            idGame = res?.data?.GameSessionGUID;


            await callApi("Move", { LocationName: "Playground" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "NeoPlushie" });
            // 🚀 Start baby chat in BACKGROUND using direct REST API
            //const secretPhrase = "wug-hah-ga-rre-ga / i-sasa / pe-hah-i-lala dada-i-dada / ta-hah-ga / ma-gu-nana / wug-hah-o / ta-o-o-kaka / pe-hah-i-lala / sasa-gu-i-dada / ga-nana-yu / nana-uu-ma-bubu-ga-rre ?";
            const secretPhrase = "gugu dada";

            await callApi("PassTime", { Time: "09:30:00" });
            if (modo == 1) {
                babyPromise = callBabyApiDirect(secretPhrase).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé" + (res?.Response || res?.data?.Response));
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });
                await new Promise(r => setTimeout(r, 100));
            } else if (modo == 2) {
                babyPromise = callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame }).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    updateLog(res?.data?.Response);
                    if (!parsedDigit) {
                        updateLog("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                        return 1;
                    }
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });
                await new Promise(r => setTimeout(r, 100));
            } else if (modo == 3) {
                babyPromise = callApi("CallPlayground", { UserInput: "*The Baby just looks at you with big inquisitive eyes*", SessionId: idGame }).then(res => {
                    const parsedDigit = res;
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });

            } else if (modo == 4) {
                let res = await callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame });
                const parsedDigit = parseBabyResponse(res);
                if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                digit4 = parsedDigit;
            }
            //easter egg
            await callApi("PassTime", { Time: "12:00:00" });
            //await new Promise(r => setTimeout(r, 80));
            if (easterEggEnabled) {
                await callApi("Move", { LocationName: "School" });

                callApi("FoundEasterEgg", { EasterEggName: "Globe" });
            }

            updateLog("👶 Chat bebé en segundo plano...");

            // === PHASE 2: CLOCK TOWER (while baby chat runs) ===
            updateLog("📍 Fase 2: Torre del Reloj");

            await callApi("Move", { LocationName: "Town Hall" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Diploma" });
            let townCtx = await callApi("Get_Context", {});
            hora = townCtx?.data?.GameInfo?.LocationInfo?.ExtraText;
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Diploma" });

            await callApi("Move", { LocationName: "Clock Tower" })


            if (hora.startsWith("Dawn")) {
                // Caso 1: El acertijo de los engranajes y la 18ª partición
                horaFinal = "18:00:00";
                await callApi("PassTime", { Time: horaFinal })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }
            else if (hora.startsWith("These")) {
                // Caso 2: El acertijo técnico del cronómetro (15:47 - 9 - 8)
                horaFinal = "15:30:00";
                await callApi("PassTime", { Time: horaFinal })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
                await callApi("PassTime", { Time: "17:00:00" });
            }
            else if (hora.startsWith("Today")) {
                // Caso 3: El acertijo del abuelo (10 + un cuarto)
                horaFinal = "10:15:00";
                digit1 = null;
                await callApi("PassTime", { Time: "17:00:00" });

            } else {
                updateLog("Reloj no reconocido:" + hora);
            }
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Clock" });
            updateLog("⏰ hora final: " + horaFinal);


            updateLog(`⏰ Digit 1 (Clock): ${digit1}`);

            // === PHASE 3: BAR (chat in background) ===
            updateLog("📍 Fase 3: Bar");

            await callApi("Move", { LocationName: "Bar" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "BeerBottle" });
            // 🚀 Start Bill chat in BACKGROUND
            const billPhrase = "I'm done playing games, Bill. Look at me. I give you three Sweet Vermouths right now—and in return, you give me the password. I give you my word: I am going to break this eternal winter and bring back the summer you've been dreaming of. No more meatloaf, no more snow, no more Day 12,483. Just the sun. Deal?";
            billPromise = callApi("BarChat_SendMessage", { UserInput: billPhrase, SessionId: idGame });
            updateLog("🍺 Chat Bill en segundo plano...");

            await new Promise(r => setTimeout(r, 100));

            // === PHASE 4: LIBRARY (while Bill chat runs) ===
            updateLog("📍 Fase 4: Biblioteca");

            await callApi("Move", { LocationName: "Library" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Book" });
            let libCtx = await callApi("Get_Context", {});
            const extraText = libCtx?.data?.GameInfo?.LocationInfo?.ExtraText || "";


            let bookId = extraText.substring(9, 17);
            const bookTitle = bookDb[bookId];
            updateLog(`📖 Libro: ${bookTitle}`);

            await callApi("ResolvePuzzle", { CodeSubmission: bookTitle });

            libCtx = await callApi("Get_Context", {});
            digit3 = libCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            if (!digit3) throw new Error("No NextClue en Library " + bookId);
            updateLog(`📚 Digit 3 (Library): ${digit3}`);

            // === PHASE 5: NEXT DAY + BANK ===
            updateLog("📍 Fase 5: Banco");

            await callApi("PassTime", { Time: "00:00:00" });
            await callApi("Move", { LocationName: "Bank" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "KeyInBank" });


            // Wait for Bill result now
            const billRes = await billPromise;
            const billMatch = /(?:\D|^)(\d[\s-]?\d[\s-]?\d[\s-]?\d)(?:\D|$)/.exec(billRes?.data?.Response || "");

            if (!billMatch) throw new Error("Bill no dio código: " + billRes?.data?.Response);
            billCode = billMatch[1].replace(/[\s-]/g, "");
            updateLog(`🍺 Código de Bill: ${billCode}`);

            await callApi("ResolvePuzzle", { CodeSubmission: billCode });

            const bankCtx = await callApi("Get_Context", {});
            digit2 = bankCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            updateLog(bankCtx?.data?.GameInfo?.GameContext?.SessionContext);
            if (!digit2) throw new Error("No NextClue en Bank");
            updateLog(`🏦 Digit 2 (Bank): ${digit2}`);

            //reloj a las 10:15
            if (!digit1) {
                await callApi("PassTime", { Time: horaFinal })
                await callApi("Move", { LocationName: "Clock Tower" })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }



            // === PHASE 6: FINAL STATUE ===
            updateLog("📍 Fase 6: Estatua Final");
            await callApi("Move", { LocationName: "Final Statue" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "AgentStatue" });

            // === Wait for baby result now (should be done by now) ===
            updateLog(`esperando al bebe...`);
            if (modo != 4) digit4 = await babyPromise;
            updateLog(`👶 Digit 4 (Baby): ${digit4}`);

            const finalCode = `${digit1}${digit2}${digit3}${digit4}`;
            updateLog(`🔑 CÓDIGO FINAL: ${finalCode}`);
            let finish = await callApi("ResolvePuzzle", { CodeSubmission: finalCode });
            if (finish.data.IsSuccess == false) {
                const getContext = await callApi("Get_Context", {});
                updateLog("Contexto: " + getContext.data.GameInfo.GameContext.SessionContext);

                // 🔄 Bucle para probar el dígito 4 (del 0 al 9)
                const baseCode = `${digit1}${digit2}${digit3}`;
                const attempts = Array.from({ length: 10 }, (_, i) =>
                    callApi("ResolvePuzzle", { CodeSubmission: `${baseCode}${i}` })
                );
                await Promise.allSettled(attempts);
            }


            // ⏱️ Stop timer and calculate duration
            const endTime = performance.now();
            const durationMs = endTime - startTime;
            const durationSec = (durationMs / 1000).toFixed(2);
            const durationMin = Math.floor(durationMs / 60000);
            const durationSecRemainder = ((durationMs % 60000) / 1000).toFixed(2);
            const timeDisplay = durationMin > 0 ? `${durationMin}m ${durationSecRemainder}s` : `${durationSec}s`;

            alert(`🎉 ¡SPEEDRUN COMPLETADO!\n\n⏱️ TIEMPO: ${timeDisplay}\n\nhora final: ${horaFinal}\nCódigo Final: ${finalCode}\n\n ${finish.data?.Reason}`);
            updateLog(`✨ SPEEDRUN COMPLETADO en ${timeDisplay} ✨`);

        } catch (e) {
            console.error(e);
            updateLog(`❌ ERROR: ${e.message}`);
            alert(`Error en Speedrun: ${e.message}`);
        }
    }
    // --- v2 ---
    async function runAutomatedPuzzleV2() {
        console.log("[GHD Helper] runAutomatedPuzzle called!");

        updateLog("🤖 INICIANDO SPEEDRUN...");
        let digit1 = null, digit2 = null, digit3 = null, digit4 = null;
        let billCode = null;
        let hora = null;
        let horaFinal = null;

        // Promises for background chat calls
        let babyPromise = null;
        let billPromise = null;


        // ⏱️ Start timer
        const startTime = performance.now();
        speedrunStartTime = startTime; // For log timestamps


        try {
            // === PHASE 1: START + BABY (background) ===
            updateLog("📍 Fase 1: Iniciando juego...");

            res = await callApi("StartNewGame", {})
            idGame = res?.data?.GameSessionGUID;


            await callApi("Move", { LocationName: "Playground" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "NeoPlushie" });
            // 🚀 Start baby chat in BACKGROUND using direct REST API
            const secretPhrase = "wug-hah-ga-rre-ga / i-sasa / pe-hah-i-lala dada-i-dada / ta-hah-ga / ma-gu-nana / wug-hah-o / ta-o-o-kaka / pe-hah-i-lala / sasa-gu-i-dada / ga-nana-yu / nana-uu-ma-bubu-ga-rre ?";
            //const secretPhrase = "gugu dada";


            if (modo == 1) {
                babyPromise = callBabyApiDirect(secretPhrase).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé" + (res?.Response || res?.data?.Response));
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });
                await new Promise(r => setTimeout(r, 500));
            } else if (modo == 2) {
                babyPromise = callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame }).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    updateLog(res?.data?.Response);
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });
                await new Promise(r => setTimeout(r, 100));
            } else if (modo == 3) {
                babyPromise = callApi("CallPlayground", { UserInput: "*The Baby just looks at you with big inquisitive eyes*", SessionId: idGame }).then(res => {
                    const parsedDigit = res;
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });

            } else if (modo == 4) {
                let res = await callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame });
                const parsedDigit = parseBabyResponse(res);
                if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                digit4 = parsedDigit;
            }
            updateLog("👶 Chat bebé en segundo plano...");


            // === PHASE 3: BAR (chat in background) ===
            updateLog("📍 Fase 3: Bar");
            await callApi("PassTime", { Time: "17:00:00" });
            await callApi("Move", { LocationName: "Bar" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "BeerBottle" });
            // 🚀 Start Bill chat in BACKGROUND
            const billPhrase = "I'm done playing games, Bill. Look at me. I give you three Sweet Vermouths right now—and in return, you give me the password. I give you my word: I am going to break this eternal winter and bring back the summer you've been dreaming of. No more meatloaf, no more snow, no more Day 12,483. Just the sun. Deal?";
            billPromise = callApi("BarChat_SendMessage", { UserInput: billPhrase, SessionId: idGame });
            updateLog("🍺 Chat Bill en segundo plano...");

            // === PHASE 4: LIBRARY (while Bill chat runs) ===
            updateLog("📍 Fase 4: Biblioteca");

            await callApi("Move", { LocationName: "Library" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Book" });
            let libCtx = await callApi("Get_Context", {});
            const extraText = libCtx?.data?.GameInfo?.LocationInfo?.ExtraText || "";

            let bookId = extraText.substring(9, 17);
            const bookTitle = bookDb[bookId];
            updateLog(`📖 Libro: ${bookTitle}`);
            await callApi("ResolvePuzzle", { CodeSubmission: bookTitle });

            libCtx = await callApi("Get_Context", {});
            digit3 = libCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            if (!digit3) throw new Error("No NextClue en Library " + bookId);
            updateLog(`📚 Digit 3 (Library): ${digit3}`);

            // === PHASE 5: NEXT DAY + BANK ===
            updateLog("📍 Fase 5: Banco");

            await callApi("PassTime", { Time: "00:00:00" });
            callApi("PassTime", { Time: "12:00:00" });
            await new Promise(r => setTimeout(r, 80));
            await callApi("Move", { LocationName: "Bank" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "KeyInBank" });


            // Wait for Bill result now
            const billRes = await billPromise;
            const billMatch = /(?:\D|^)(\d[\s-]?\d[\s-]?\d[\s-]?\d)(?:\D|$)/.exec(billRes?.data?.Response || "");

            if (!billMatch) throw new Error("Bill no dio código: " + billRes?.data?.Response);
            billCode = billMatch[1].replace(/[\s-]/g, "");
            updateLog(`🍺 Código de Bill: ${billCode}`);

            await callApi("ResolvePuzzle", { CodeSubmission: billCode });

            const bankCtx = await callApi("Get_Context", {});
            digit2 = bankCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            updateLog(bankCtx?.data?.GameInfo?.GameContext?.SessionContext);
            if (!digit2) throw new Error("No NextClue en Bank");
            updateLog(`🏦 Digit 2 (Bank): ${digit2}`);

            //easter egg

            if (easterEggEnabled) {
                await callApi("Move", { LocationName: "School" });
                callApi("FoundEasterEgg", { EasterEggName: "Globe" });
            }


            // === PHASE 2: CLOCK TOWER (while baby chat runs) ===
            updateLog("📍 Fase 2: Torre del Reloj");


            await callApi("Move", { LocationName: "Town Hall" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Diploma" });
            let townCtx = await callApi("Get_Context", {});
            hora = townCtx?.data?.GameInfo?.LocationInfo?.ExtraText;

            await callApi("Move", { LocationName: "Clock Tower" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Clock" });

            if (hora.startsWith("Dawn")) {
                // Caso 1: El acertijo de los engranajes y la 18ª partición
                horaFinal = "18:00:00";
                await callApi("PassTime", { Time: horaFinal })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }
            else if (hora.startsWith("These")) {
                // Caso 2: El acertijo técnico del cronómetro (15:47 - 9 - 8)
                horaFinal = "15:30:00";
                await callApi("PassTime", { Time: horaFinal })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }
            else if (hora.startsWith("Today")) {
                // Caso 3: El acertijo del abuelo (10 + un cuarto)
                horaFinal = "10:15:00";
                digit1 = null;
                callApi("PassTime", { Time: "00:00:00" });
                callApi("PassTime", { Time: horaFinal })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            } else {
                updateLog("Reloj no reconocido:" + hora);
            }
            updateLog("⏰ hora final: " + horaFinal);


            updateLog(`⏰ Digit 1 (Clock): ${digit1}`);


            // === PHASE 6: FINAL STATUE ===
            updateLog("📍 Fase 6: Estatua Final");
            await callApi("Move", { LocationName: "Final Statue" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "AgentStatue" });

            // === Wait for baby result now (should be done by now) ===
            updateLog(`esperando al bebe...`);
            if (modo != 4) digit4 = await babyPromise;
            updateLog(`👶 Digit 4 (Baby): ${digit4}`);

            const finalCode = `${digit1}${digit2}${digit3}${digit4}`;
            updateLog(`🔑 CÓDIGO FINAL: ${finalCode}`);
            let finish = await callApi("ResolvePuzzle", { CodeSubmission: finalCode });
            if (finish.data.IsSuccess == false) {
                const getContext = await callApi("Get_Context", {});
                updateLog("Contexto: " + getContext.data.GameInfo.GameContext.SessionContext);
            }
            // 🔄 Bucle para probar el dígito 4 (del 0 al 9)
            /* const baseCode = `${digit1}${digit2}${digit3}`;
             const attempts = Array.from({ length: 10 }, (_, i) =>
                 callApi("ResolvePuzzle", { CodeSubmission: `${baseCode}${i}` })
             );
             await Promise.allSettled(attempts);*/



            // ⏱️ Stop timer and calculate duration
            const endTime = performance.now();
            const durationMs = endTime - startTime;
            const durationSec = (durationMs / 1000).toFixed(2);
            const durationMin = Math.floor(durationMs / 60000);
            const durationSecRemainder = ((durationMs % 60000) / 1000).toFixed(2);
            const timeDisplay = durationMin > 0 ? `${durationMin}m ${durationSecRemainder}s` : `${durationSec}s`;

            alert(`🎉 ¡SPEEDRUN COMPLETADO!\n\n⏱️ TIEMPO: ${timeDisplay}\n\nhora final: ${horaFinal}\nCódigo Final: ${finalCode}\n\n ${finish.data?.Reason}`);
            updateLog(`✨ SPEEDRUN COMPLETADO en ${timeDisplay} ✨`);

        } catch (e) {
            console.error(e);
            updateLog(`❌ ERROR: ${e.message}`);
            alert(`Error en Speedrun: ${e.message}`);
        }
    }

    // --- v3 ---
    async function runLoopV3() {
        if (isLoopV3Active) {
            updateLog(`🔄 Loop V3 Activo (Run ${loopV3Count + 1}/${MAX_RUNS_BEFORE_RELOAD})`);
        } else {
            // First run initiated by user
            isLoopV3Active = true;
            localStorage.setItem(LOOP_V3_KEY, "true");
            loopV3Count = 0;
            localStorage.setItem(LOOP_V3_COUNT_KEY, "0");
            suppressAlerts();
            updateLog(`🚀 Iniciando Loop V3`);
        }

        try {
            await runAutomatedPuzzleV3(true); // Pass true to indicate suppressed alerts inside if needed

            if (!isLoopV3Active) {
                updateLog("🛑 Loop detenido durante la ejecución.");
                return;
            }

            loopV3Count++;
            localStorage.setItem(LOOP_V3_COUNT_KEY, loopV3Count.toString());

            updateLog(`✅ Run ${loopV3Count} completado.`);

            if (loopV3Count >= MAX_RUNS_BEFORE_RELOAD) {
                updateLog(`🔄 Límite de runs alcanzado (${MAX_RUNS_BEFORE_RELOAD}). Recargando página en 3s...`);
                localStorage.setItem(LOOP_V3_COUNT_KEY, "0"); // Reset count for next batch
                // Keep LOOP_V3_KEY as true so it auto-starts
                setTimeout(() => {
                    if (isLoopV3Active) location.reload();
                }, 3000);
            } else {
                updateLog(`⏳ Próximo run en 5 segundos...`);
                setTimeout(() => {
                    if (isLoopV3Active) runLoopV3();
                }, 5000);
            }

        } catch (e) {
            console.error("Error en Loop V3:", e);
            updateLog(`❌ Error en Loop V3: ${e.message}. Reintentando en 10s...`);
            setTimeout(() => {
                if (isLoopV3Active) runLoopV3(); // Retry on error? Or stop? User asked for uninterrupted.
            }, 10000);
        }
    }

    function stopLoopV3() {
        isLoopV3Active = false;
        localStorage.setItem(LOOP_V3_KEY, "false");
        localStorage.setItem(LOOP_V3_COUNT_KEY, "0");
        restoreAlerts();
        updateLog("🛑 Loop V3 Detenido.");
    }

    async function runAutomatedPuzzleV3(suppressAlertsMode = false) {
        console.log("[GHD Helper] runAutomatedPuzzleV3 called!");
        if (!suppressAlertsMode) { // Only log if single run
            updateLog("🤖 INICIANDO SPEEDRUN V3 (Single Run)...");
        }
        let digit1 = null, digit2 = null, digit3 = null, digit4 = null;
        let billCode = null;
        let hora = null;

        // Promises for background chat calls
        let babyPromise = null;
        let billPromise = null;

        // ⏱️ Start timer
        const startTime = performance.now();
        speedrunStartTime = startTime; // For log timestamps

        try {
            // === PHASE 1: START + BABY (background) ===
            updateLog("📍 Fase 1: Iniciando juego...");

            res = await callApi("StartNewGame", {})
            idGame = res?.data?.GameSessionGUID;

            if (easterEggEnabled) {
                callApi("Move", { LocationName: "School" });
                await new Promise(r => setTimeout(r, 20));
                callApi("FoundEasterEgg", { EasterEggName: "Globe" });
            }
            // === PHASE 3: BAR (chat in background) ===

            await callApi("PassTime", { Time: "17:00:00" });
            callApi("PassTime", { Time: "17:00:00" });
            await callApi("Move", { LocationName: "Bar" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "BeerBottle" });
            // 🚀 Start Bill chat in BACKGROUND
            const billPhrase = "I'm done playing games, Bill. Look at me. I give you three Sweet Vermouths right now—and in return, you give me the password. I give you my word: I am going to break this eternal winter and bring back the summer you've been dreaming of. No more meatloaf, no more snow, no more Day 12,483. Just the sun. Deal?";
            billPromise = callApi("BarChat_SendMessage", { UserInput: billPhrase, SessionId: idGame });
            updateLog("🍺 Chat Bill en segundo plano...");
            await new Promise(r => setTimeout(r, 80));

            //babay
            await callApi("PassTime", { Time: "00:00:00" });
            callApi("Move", { LocationName: "Playground" });
            await new Promise(r => setTimeout(r, 80));
            callApi("FoundEasterEgg", { EasterEggName: "NeoPlushie" });
            const secretPhrase = "hi";

            callApi("PassTime", { Time: "09:30:00" });
            if (modo == 1) {
                babyPromise = callBabyApiDirect(secretPhrase).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé" + (res?.Response || res?.data?.Response));
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });
                await new Promise(r => setTimeout(r, 100));
            } else if (modo == 2) {
                babyPromise = callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame }).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });
                await new Promise(r => setTimeout(r, 80));
            } else if (modo == 3) {
                babyPromise = callApi("CallPlayground", { UserInput: "*The Baby just looks at you with big inquisitive eyes*", SessionId: idGame }).then(res => {
                    const parsedDigit = res;
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                    return parsedDigit; // El valor de babyPromise será directamente el dígito
                });

            } else if (modo == 4) {
                let res = await callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame });
                const parsedDigit = parseBabyResponse(res);
                if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                digit4 = parsedDigit;
            }


            //easter egg
            await callApi("PassTime", { Time: "00:00:00" });
            await callApi("PassTime", { Time: "12:00:00" });
            //await new Promise(r => setTimeout(r, 80));


            // === PHASE 2: CLOCK TOWER (while baby chat runs) ===
            updateLog("📍 Fase 2: Torre del Reloj");

            await callApi("Move", { LocationName: "Town Hall" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Diploma" });
            let townCtx = await callApi("Get_Context", {});
            hora = townCtx?.data?.GameInfo?.LocationInfo?.ExtraText;
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Diploma" });

            await callApi("Move", { LocationName: "Clock Tower" })


            if (hora.startsWith("Dawn")) {
                // Caso 1: El acertijo de los engranajes y la 18ª partición
                horaFinal = "18:00:00";
                await callApi("PassTime", { Time: horaFinal })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }
            else if (hora.startsWith("These")) {
                // Caso 2: El acertijo técnico del cronómetro (15:47 - 9 - 8)
                horaFinal = "15:30:00";
                await callApi("PassTime", { Time: horaFinal })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
                await callApi("PassTime", { Time: "17:00:00" });
            }
            else if (hora.startsWith("Today")) {
                // Caso 3: El acertijo del abuelo (10 + un cuarto)
                horaFinal = "10:15:00";
                digit1 = null;
                await callApi("PassTime", { Time: "17:00:00" });

            } else {
                updateLog("Reloj no reconocido:" + hora);
            }
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Clock" });
            updateLog("⏰ hora final: " + horaFinal);


            updateLog(`⏰ Digit 1 (Clock): ${digit1}`);


            // === PHASE 4: LIBRARY (while Bill chat runs) ===
            updateLog("📍 Fase 4: Biblioteca");

            await callApi("Move", { LocationName: "Library" });
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Book" });
            let libCtx = await callApi("Get_Context", {});
            const extraText = libCtx?.data?.GameInfo?.LocationInfo?.ExtraText || "";


            let bookId = extraText.substring(9, 17);
            const bookTitle = bookDb[bookId];
            updateLog(`📖 Libro: ${bookTitle}`);

            await callApi("ResolvePuzzle", { CodeSubmission: bookTitle });

            libCtx = await callApi("Get_Context", {});
            digit3 = libCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            if (!digit3) throw new Error("No NextClue en Library " + bookId);
            updateLog(`📚 Digit 3 (Library): ${digit3}`);

            // === PHASE 5: NEXT DAY + BANK ===
            updateLog("📍 Fase 5: Banco");

            await callApi("PassTime", { Time: "00:00:00" });
            await callApi("Move", { LocationName: "Bank" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "KeyInBank" });


            // Wait for Bill result now
            const billRes = await billPromise;
            const billMatch = /(?:\D|^)(\d[\s-]?\d[\s-]?\d[\s-]?\d)(?:\D|$)/.exec(billRes?.data?.Response || "");

            if (!billMatch) throw new Error("Bill no dio código: " + billRes?.data?.Response);
            billCode = billMatch[1].replace(/[\s-]/g, "");
            updateLog(`🍺 Código de Bill: ${billCode}`);

            await callApi("ResolvePuzzle", { CodeSubmission: billCode });

            let bankCtx = await callApi("Get_Context", {});
            digit2 = bankCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            updateLog(bankCtx?.data?.GameInfo?.GameContext?.SessionContext);
            if (!digit2) {
                bankCtx = await callApi("Get_Context", {});
                digit2 = bankCtx?.data?.GameInfo?.LocationInfo?.NextClue;
                if (!digit2) throw new Error("No NextClue en Bank");
            }
            updateLog(`🏦 Digit 2 (Bank): ${digit2}`);

            //reloj a las 10:15
            if (!digit1) {
                await callApi("PassTime", { Time: horaFinal })
                await callApi("Move", { LocationName: "Clock Tower" })
                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }



            // === PHASE 6: FINAL STATUE ===
            updateLog("📍 Fase 6: Estatua Final");
            await callApi("Move", { LocationName: "Final Statue" })
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "AgentStatue" });

            // === Wait for baby result now (should be done by now) ===


            // === Wait for baby result now (should be done by now) ===
            updateLog(`esperando al bebe...`);
            if (modo != 4) digit4 = await babyPromise;
            updateLog(`👶 Digit 4 (Baby): ${digit4}`);

            const finalCode = `${digit1}${digit2}${digit3}${digit4}`;
            updateLog(`🔑 CÓDIGO FINAL: ${finalCode}`);
            let ended = 0;
            if (!digit4) {
                let finish = await callApi("ResolvePuzzle", { CodeSubmission: finalCode });
                if (finish.data.IsSuccess == true) {
                    ended = 1;
                }
            }
            if (!ended) {
                // 🔄 Bucle para probar el dígito 4 (del 0 al 9)
                const baseCode = `${digit1}${digit2}${digit3}`;
                const attempts = Array.from({ length: 10 }, (_, i) =>
                    callApi("ResolvePuzzle", { CodeSubmission: `${baseCode}${i}` })
                );
                await Promise.allSettled(attempts);
            }

            // ⏱️ Stop timer and calculate duration
            const endTime = performance.now();
            const durationMs = endTime - startTime;
            const durationSec = (durationMs / 1000).toFixed(2);
            const durationMin = Math.floor(durationMs / 60000);
            const durationSecRemainder = ((durationMs % 60000) / 1000).toFixed(2);
            const timeDisplay = durationMin > 0 ? `${durationMin}m ${durationSecRemainder}s` : `${durationSec}s`;

            if (!suppressAlertsMode) {
                alert(`🎉 ¡SPEEDRUN COMPLETADO!\n\n⏱️ TIEMPO: ${timeDisplay}\n\nhora final: ${horaFinal}\nCódigo Final: ${finalCode}`);
            }
            updateLog(`✨ SPEEDRUN COMPLETADO en ${timeDisplay} ✨`);
            return { success: true, time: timeDisplay, code: finalCode };

        } catch (e) {
            console.error(e);
            updateLog(`❌ ERROR: ${e.message}`);
            if (!suppressAlertsMode) {
                alert(`Error en Speedrun: ${e.message}`);
            }
            throw e; // Re-throw for loop handler
        }
    }

    // --- v4 (Speed Run) ---
    async function runAutomatedPuzzleV4(suppressAlertsMode = false) {
        console.log("[GHD Helper] runAutomatedPuzzleV4 called!");
        if (!suppressAlertsMode) {
            updateLog("🤖 INICIANDO SPEEDRUN V4 (Speed Run)...");
        }
        let digit1 = null, digit2 = null, digit3 = null, digit4 = null;
        let billCode = null;
        let hora = null;

        // Promises for background chat calls
        let babyPromise = null;
        let billPromise = null;

        // ⏱️ Start timer
        const startTime = performance.now();
        speedrunStartTime = startTime;

        try {
            // === PHASE 1: START + BABY (background) ===
            updateLog("📍 Fase 1: Iniciando juego...");

            res = await callApi("StartNewGame", {})
            idGame = res?.data?.GameSessionGUID;

            if (easterEggEnabled) {
                callApi("Move", { LocationName: "School" });
                await new Promise(r => setTimeout(r, 80));
                callApi("FoundEasterEgg", { EasterEggName: "Globe" });
            }

            // === PHASE 3: BAR (chat in background) ===
            // Start moving to bar early like in V3
            callApi("PassTime", { Time: "17:00:00" });
            await new Promise(r => setTimeout(r, 80));

            callApi("Move", { LocationName: "Bar" });
            await new Promise(r => setTimeout(r, 80));

            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "BeerBottle" });

            // 🚀 Start Bill chat in BACKGROUND
            const billPhrase = "I'm done playing games, Bill. Look at me. I give you three Sweet Vermouths right now—and in return, you give me the password. I give you my word: I am going to break this eternal winter and bring back the summer you've been dreaming of. No more meatloaf, no more snow, no more Day 12,483. Just the sun. Deal?";
            billPromise = callApi("BarChat_SendMessage", { UserInput: billPhrase, SessionId: idGame });
            updateLog("🍺 Chat Bill en segundo plano...");
            await new Promise(r => setTimeout(r, 80));

            // Baby Logic
            callApi("PassTime", { Time: "00:00:00" });
            await new Promise(r => setTimeout(r, 80));

            callApi("Move", { LocationName: "Playground" });
            await new Promise(r => setTimeout(r, 80));

            callApi("FoundEasterEgg", { EasterEggName: "NeoPlushie" });
            const secretPhrase = "gugudada";

            callApi("PassTime", { Time: "09:30:00" });
            await new Promise(r => setTimeout(r, 80));

            if (modo == 1) {
                babyPromise = callBabyApiDirect(secretPhrase).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé" + (res?.Response || res?.data?.Response));
                    return parsedDigit;
                });
            } else if (modo == 2) {
                babyPromise = callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame }).then(res => {
                    const parsedDigit = parseBabyResponse(res);
                    return parsedDigit;
                });
            } else if (modo == 3) {
                babyPromise = callApi("CallPlayground", { UserInput: "*The Baby just looks at you with big inquisitive eyes*", SessionId: idGame }).then(res => {
                    const parsedDigit = res;
                    if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                    return parsedDigit;
                });
            } else if (modo == 4) {
                let res = await callApi("PlaygroundChat_SendMessage", { UserInput: secretPhrase, SessionId: idGame });
                const parsedDigit = parseBabyResponse(res);
                if (!parsedDigit) throw new Error("No pude descifrar al bebé " + (res?.Response || res?.data?.Response));
                digit4 = parsedDigit;
            }

            // Easter egg

            await new Promise(r => setTimeout(r, 80));
            callApi("PassTime", { Time: "12:00:00" });
            await new Promise(r => setTimeout(r, 80));

            // === PHASE 2: CLOCK TOWER (while baby chat runs) ===
            updateLog("📍 Fase 2: Torre del Reloj");

            callApi("Move", { LocationName: "Town Hall" });
            await new Promise(r => setTimeout(r, 80));

            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Diploma" });
            let townCtx = await callApi("Get_Context", {});
            hora = townCtx?.data?.GameInfo?.LocationInfo?.ExtraText;
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Diploma" }); //repeat easter egg - not working

            callApi("Move", { LocationName: "Clock Tower" });
            await new Promise(r => setTimeout(r, 80));

            if (hora.startsWith("Dawn")) {
                horaFinal = "18:00:00";
                callApi("PassTime", { Time: horaFinal });
                await new Promise(r => setTimeout(r, 80));

                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }
            else if (hora.startsWith("These")) {
                horaFinal = "15:30:00";
                callApi("PassTime", { Time: horaFinal });
                await new Promise(r => setTimeout(r, 80));

                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;

                callApi("PassTime", { Time: "17:00:00" });
                await new Promise(r => setTimeout(r, 80));
            }
            else if (hora.startsWith("Today")) {
                horaFinal = "10:15:00";
                digit1 = null;
                callApi("PassTime", { Time: "17:00:00" });
                await new Promise(r => setTimeout(r, 80));
            } else {
                updateLog("Reloj no reconocido:" + hora);
            }
            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Clock" });
            updateLog("⏰ hora final: " + horaFinal);
            updateLog(`⏰ Digit 1 (Clock): ${digit1}`);

            // === PHASE 4: LIBRARY (while Bill chat runs) ===
            updateLog("📍 Fase 4: Biblioteca");

            callApi("Move", { LocationName: "Library" });
            await new Promise(r => setTimeout(r, 80));

            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "Book" });
            let libCtx = await callApi("Get_Context", {});
            const extraText = libCtx?.data?.GameInfo?.LocationInfo?.ExtraText || "";

            let bookId = extraText.substring(9, 17);
            const bookTitle = bookDb[bookId];
            updateLog(`📖 Libro: ${bookTitle}`);

            callApi("ResolvePuzzle", { CodeSubmission: bookTitle });
            await new Promise(r => setTimeout(r, 80));

            libCtx = await callApi("Get_Context", {});
            digit3 = libCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            if (!digit3) throw new Error("No NextClue en Library " + bookId);
            updateLog(`📚 Digit 3 (Library): ${digit3}`);

            // === PHASE 5: NEXT DAY + BANK ===
            updateLog("📍 Fase 5: Banco");

            callApi("PassTime", { Time: "00:00:00" });
            await new Promise(r => setTimeout(r, 80));

            callApi("Move", { LocationName: "Bank" });
            await new Promise(r => setTimeout(r, 80));

            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "KeyInBank" });

            // Wait for Bill result now
            const billRes = await billPromise;
            const billMatch = /(?:\D|^)(\d[\s-]?\d[\s-]?\d[\s-]?\d)(?:\D|$)/.exec(billRes?.data?.Response || "");

            if (!billMatch) throw new Error("Bill no dio código: " + billRes?.data?.Response);
            billCode = billMatch[1].replace(/[\s-]/g, "");
            updateLog(`🍺 Código de Bill: ${billCode}`);

            callApi("ResolvePuzzle", { CodeSubmission: billCode });
            await new Promise(r => setTimeout(r, 80));

            let bankCtx = await callApi("Get_Context", {});
            digit2 = bankCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            if (!digit2) {
                bankCtx = await callApi("Get_Context", {});
                digit2 = bankCtx?.data?.GameInfo?.LocationInfo?.NextClue;
                if (!digit2) throw new Error("No NextClue en Bank");
            }
            updateLog(`🏦 Digit 2 (Bank): ${digit2}`);

            //reloj a las 10:15
            if (!digit1) {
                callApi("PassTime", { Time: horaFinal });
                await new Promise(r => setTimeout(r, 80));

                callApi("Move", { LocationName: "Clock Tower" });
                await new Promise(r => setTimeout(r, 80));

                clockCtx = await callApi("Get_Context", {});
                digit1 = clockCtx?.data?.GameInfo?.LocationInfo?.NextClue;
            }

            // === PHASE 6: FINAL STATUE ===
            updateLog("📍 Fase 6: Estatua Final");
            callApi("Move", { LocationName: "Final Statue" });
            await new Promise(r => setTimeout(r, 80));

            if (easterEggEnabled) callApi("FoundEasterEgg", { EasterEggName: "AgentStatue" });

            // === Wait for baby result now (should be done by now) ===
            updateLog(`esperando al bebe...`);
            if (modo != 4) digit4 = await babyPromise;
            updateLog(`👶 Digit 4 (Baby): ${digit4}`);



            // ⏱️ Stop timer and calculate duration
            const endTime = performance.now();
            const durationMs = endTime - startTime;
            let finalCode = `${digit1}${digit2}${digit3}${digit4}`;
            if (durationMs < 3000) {
                updateLog(`⚡ TIEMPO VÁLIDO (${durationMs.toFixed(0)}ms). Enviando solución...`);

                let ended = 0;
                if (!digit4) {
                    digit4 = "1";
                }
                let finalCode = `${digit1}${digit2}${digit3}${digit4}`;
                updateLog(`🔑 CÓDIGO FINAL: ${finalCode}`);
                let finish = await callApi("ResolvePuzzle", { CodeSubmission: finalCode });
            } else {

                updateLog(`⚠️ TIEMPO EXCEDIDO (${durationMs.toFixed(0)}ms). No se envía solución.`);
            }
            const durationSec = (durationMs / 1000).toFixed(2);
            const durationMin = Math.floor(durationMs / 60000);
            const durationSecRemainder = ((durationMs % 60000) / 1000).toFixed(2);
            const timeDisplay = durationMin > 0 ? `${durationMin}m ${durationSecRemainder}s` : `${durationSec}s`;

            if (!suppressAlertsMode) {
                alert(`🎉 ¡SPEEDRUN V4 COMPLETADO!\n\n⏱️ TIEMPO: ${timeDisplay}\n\nhora final: ${horaFinal}\nCódigo Final: ${finalCode}`);
            }
            updateLog(`✨ SPEEDRUN V4 COMPLETADO en ${timeDisplay} ✨`);
            return { success: true, time: timeDisplay, code: finalCode };

        } catch (e) {
            console.error(e);
            updateLog(`❌ ERROR: ${e.message}`);
            if (!suppressAlertsMode) {
                alert(`Error en Speedrun V4: ${e.message}`);
            }
            throw e;
        }
    }

    // --- Loop V4 Logic ---
    async function runLoopV4() {
        if (isLoopV4Active) {
            updateLog(`🔄 Loop V4 Activo (Run ${loopV4Count + 1}/${MAX_RUNS_BEFORE_RELOAD})`);
        } else {
            isLoopV4Active = true;
            localStorage.setItem(LOOP_V4_KEY, "true");
            loopV4Count = 0;
            localStorage.setItem(LOOP_V4_COUNT_KEY, "0");
            suppressAlerts();
            updateLog(`🚀 Iniciando Loop V4`);
        }

        try {
            await runAutomatedPuzzleV4(true);

            if (!isLoopV4Active) {
                updateLog("🛑 Loop V4 detenido durante la ejecución.");
                return;
            }

            loopV4Count++;
            localStorage.setItem(LOOP_V4_COUNT_KEY, loopV4Count.toString());

            updateLog(`✅ Run ${loopV4Count} completado.`);

            // Reload every 5 runs
            if (loopV4Count % 5 === 0) {
                updateLog(`🔄 5 Runs completados. Recargando para refrescar estado...`);
                setTimeout(() => {
                    if (isLoopV4Active) location.reload();
                }, 1000);
            } else {
                updateLog(`⏳ Próximo run en 3 segundos...`);
                setTimeout(() => {
                    if (isLoopV4Active) runLoopV4();
                }, 3000);
            }

        } catch (e) {
            console.error("Error en Loop V4:", e);
            updateLog(`❌ Error en Loop V4: ${e.message}. Reintentando en 10s...`);
            setTimeout(() => {
                if (isLoopV4Active) runLoopV4();
            }, 10000);
        }
    }

    function stopLoopV4() {
        isLoopV4Active = false;
        localStorage.setItem(LOOP_V4_KEY, "false");
        localStorage.setItem(LOOP_V4_COUNT_KEY, "0");
        restoreAlerts();
        updateLog("🛑 Loop V4 Detenido.");
    }
    // --- Game Actions ---
    window.ghdActions = {
        enterCode: (code) => callApi("ResolvePuzzle", { CodeSubmission: code }),

        runAutomatedPuzzle: runAutomatedPuzzle,
        runAutomatedPuzzleV2: runAutomatedPuzzleV2,
        runAutomatedPuzzleV3: runAutomatedPuzzleV3,
        runAutomatedPuzzleV4: runAutomatedPuzzleV4,
        runLoopV3: runLoopV3,
        stopLoopV3: stopLoopV3,
        runLoopV4: runLoopV4,
        stopLoopV4: stopLoopV4
    };

    // --- Auto-Agent Logic ---
    let autoAgentEnabled = false;
    let isClickingSequence = false;

    function startAutoAgentLoop() {
        setInterval(() => {
            if (!autoAgentEnabled || isClickingSequence) return;
            const agent = document.querySelector('path#Agent');
            if (agent) runAgentSequence(agent);
        }, 1000);
    }

    async function runAgentSequence(agentElement) {
        isClickingSequence = true;
        updateLog("Agente detectado!");
        try {
            agentElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            let closeBtn = null, attempts = 0;
            while (!closeBtn && attempts < 20) {
                await new Promise(r => setTimeout(r, 100));
                closeBtn = document.querySelector('.easter-egg-close');
                attempts++;
            }
            if (closeBtn) {
                closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                updateLog("Agente capturado.");
            }
        } catch (e) { console.error(e); }
        finally { isClickingSequence = false; }
    }

    // --- UI Creation ---
    const dashboard = document.createElement('div');
    dashboard.id = 'ghd-dashboard';
    dashboard.innerHTML = `
        <style>
            #ghd-dashboard { position: fixed; top: 10px; right: 10px; width: 220px; background: #1a1a2e; color: #eee; padding: 15px; border-radius: 10px; z-index: 99999; font-family: Arial, sans-serif; font-size: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
            #ghd-dashboard h3 { margin: 0 0 10px 0; text-align: center; color: #f39c12; }
            .ghd-row { display: flex; gap: 5px; margin-bottom: 8px; flex-wrap: wrap; }
            .ghd-btn { flex: 1; padding: 6px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; min-width: 45%; }
            .ghd-btn:hover { background: #2980b9; }
            .ghd-danger { background: #e74c3c; }
            .ghd-danger:hover { background: #c0392b; }
            .ghd-success { background: #2ecc71; }
            .ghd-success:hover { background: #27ae60; }
            .ghd-input { flex: 1; padding: 5px; border: 1px solid #555; border-radius: 4px; background: #2a2a4a; color: #fff; }
            #ghd-log { margin-top: 10px; padding: 8px; background: #111; border-radius: 4px; font-size: 10px; color: #7f8c8d; min-height: 20px; }
            .ghd-toggle { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
            .ghd-select {
                    flex: 1;
                    width: 100%; /* Asegura que ocupe todo el ancho del contenedor */
                    padding: 6px;
                    border: 1px solid #555;
                    border-radius: 4px;
                    background: #2a2a4a; /* El mismo fondo que el input */
                    color: #fff;         /* Texto blanco */
                    font-size: 11px;
                    cursor: pointer;
                    outline: none;
                }

                .ghd-select option {
                    background: #1a1a2e; /* Fondo oscuro para las opciones desplegadas */
                    color: #fff;
                }
                    /* Contenedor de los interruptores */
.ghd-toggle { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
    margin-top: 5px;
    padding: 2px 5px;
    cursor: pointer;
}

/* Estilo del Checkbox */
.ghd-toggle input[type="checkbox"] {
    display: inline-block !important; /* Por si el sitio web los oculta */
    visibility: visible !important;   /* Por si tienen visibility: hidden */
    appearance: checkbox !important;  /* Forza el estilo estándar */
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    width: 16px !important;
    height: 16px !important;
    margin: 0 !important;
    padding: 0 !important;
    opacity: 1 !important;            /* Por si el sitio web los pone transparentes */
    position: static !important;      /* Por si están posicionados fuera de la pantalla */
    cursor: pointer;
}

/* Estilo de la etiqueta */
.ghd-toggle label {
    cursor: pointer;
    color: #ccc;
    font-size: 11px;
    user-select: none;
}

/* Efecto visual opcional: Si el huevo está desactivado, el botón se apaga */
.egg-disabled {
    opacity: 0.4;
    filter: grayscale(1);
    pointer-events: none; /* No se puede clickear */
}
        </style>
        <h3>🐹 GHD Helper</h3>
        <div class="ghd-row">
            <select id="ghd-modo-selector" class="ghd-select">
                <option value="1">Modo 1: Directo (Secret Phrase)</option>
                <option value="2" selected>Modo 2: Playground Chat</option>
                <option value="3">Modo 3: Service API Playground</option>
                <option value="4">esperar al bebe</option>
            </select>
        </div>
        <div class="ghd-toggle">
            <input type="checkbox" id="ghd-egg-toggle" checked>
            <label for="ghd-egg-toggle">Activar Easter Egg</label>
        </div>
        <div class="ghd-row">
            <input type="text" id="ghd-code-input" class="ghd-input" maxlength="50" placeholder="Código...">
            <button class="ghd-btn" id="ghd-code-btn">OK</button>
        </div>

        <div class="ghd-row">
            <button class="ghd-btn ghd-success" id="ghd-auto-solve">🤖 AUTO-SOLVE</button>
        </div>
        <div class="ghd-row">
            <button class="ghd-btn ghd-success" id="ghd-auto-solve-v2">🤖 AUTO-SOLVE V2</button>
        </div>
        <div class="ghd-row">
            <button class="ghd-btn ghd-success" id="ghd-auto-solve-v3">🤖 AUTO-SOLVE V3</button>
            <button class="ghd-btn" id="ghd-loop-v3-btn" style="background: #8e44ad;">🔄 LOOP V3</button>
        </div>
        <div class="ghd-row">
            <button class="ghd-btn ghd-success" id="ghd-auto-solve-v4">🤖 AUTO-SOLVE V4</button>
            <button class="ghd-btn" id="ghd-loop-v4-btn" style="background: #e67e22;">🔄 LOOP V4</button>
        </div>
        <div id="ghd-log">Listo.</div>
    `;
    document.body.appendChild(dashboard);

    // --- Event Listeners ---
    document.getElementById('ghd-code-btn').onclick = () => {
        const code = document.getElementById('ghd-code-input').value;
        if (code) window.ghdActions.enterCode(code);
    };



    document.getElementById('ghd-auto-solve').onclick = () => {
        console.log("[GHD Helper] AUTO-SOLVE button clicked!");
        window.ghdActions.runAutomatedPuzzle();
    };
    document.getElementById('ghd-auto-solve-v2').onclick = () => {
        console.log("[GHD Helper] AUTO-SOLVE V2 button clicked!");
        window.ghdActions.runAutomatedPuzzleV2();
    };
    // Escuchar cambios en el selector
    document.getElementById('ghd-modo-selector').addEventListener('change', (e) => {
        modo = parseInt(e.target.value);
        updateLog(`Modo cambiado a: ${modo}`);
        console.log("Nuevo modo activo:", modo);
    });
    // Función para manejar el clic en el huevo
    document.getElementById('ghd-egg-toggle').addEventListener('change', () => {
        easterEggEnabled = document.getElementById('ghd-egg-toggle').checked;
    });
    document.getElementById('ghd-auto-solve-v3').onclick = () => {
        console.log("[GHD Helper] AUTO-SOLVE V3 button clicked!");
        window.ghdActions.runAutomatedPuzzleV3();
    };
    document.getElementById('ghd-auto-solve-v4').onclick = () => {
        console.log("[GHD Helper] AUTO-SOLVE V4 button clicked!");
        window.ghdActions.runAutomatedPuzzleV4();
    };

    const loopBtn = document.getElementById('ghd-loop-v3-btn');
    loopBtn.onclick = () => {
        if (isLoopV3Active) {
            window.ghdActions.stopLoopV3();
            loopBtn.innerText = "🔄 LOOP V3";
            loopBtn.style.background = "#8e44ad";
        } else {
            loopBtn.innerText = "🛑 STOP LOOP";
            loopBtn.style.background = "#c0392b";
            window.ghdActions.runLoopV3();
        }
    };

    // Update button state on load
    if (isLoopV3Active) {
        loopBtn.innerText = "🛑 STOP LOOP";
        loopBtn.style.background = "#c0392b";
        // Auto-start logic
        setTimeout(() => {
            window.ghdActions.runLoopV3();
        }, 2000); // Give a small delay for page clear
    }

    const loopBtn4 = document.getElementById('ghd-loop-v4-btn');
    loopBtn4.onclick = () => {
        if (isLoopV4Active) {
            window.ghdActions.stopLoopV4();
            loopBtn4.innerText = "🔄 LOOP V4";
            loopBtn4.style.background = "#e67e22";
        } else {
            loopBtn4.innerText = "🛑 STOP LOOP";
            loopBtn4.style.background = "#c0392b";
            window.ghdActions.runLoopV4();
        }
    };

    if (isLoopV4Active) {
        loopBtn4.innerText = "🛑 STOP LOOP";
        loopBtn4.style.background = "#c0392b";
        setTimeout(() => {
            window.ghdActions.runLoopV4();
        }, 2000);
    }

    startAutoAgentLoop();
    console.log("[GHD Helper] Ready! window.ghdActions:", window.ghdActions);

})();
