# 📚 Documentació del Projecte: Portafolis Angular & Node.js

Aquest document recull tota la informació necessària per a l'entrega de la pràctica, incloent el guió de la presentació, les instruccions per preparar el lliurament en format ZIP, i una descripció tècnica de l'arquitectura de l'aplicació.

---

## 🎥 1. Vídeo Explicatiu del Funcionament
* **Durada estimada:** ~5 minuts.
* **Objectiu:** Mostrar el funcionament de l'aplicació al navegador i explicar els fragments més interessants del codi a l'editor.
* **Enllaç del Drive:** [🔗 Insereix aquí el teu enllaç de Google Drive] *(Recorda donar permisos d'accés del Drive al docent).*

### 🎙️ Guió del Vídeo Pas a Pas

| Temps | Secció | Acció a la Pantalla | Text / Explicació suggerida |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:30** | **Introducció** | Navegador obert a la pàgina *Sobre mi* (`/about`). | "Hola! En aquest vídeo us presentaré el meu projecte web de Portafolis, format per un frontend d'Angular 19 i un backend realitzat amb Node.js, Express i una base de dades MongoDB." |
| **0:30 - 1:15** | **Components i Routing** | Canvia a VSCode a l'arxiu `src/app/app.routes.ts`. | "L'arquitectura consta de components modulars (`About`, `Projects`, `Create`, `Detail`, `Edit`, `Contact` i `Error`). Tots es connecten dinàmicament a través de l'enrutador d'Angular en aquest arxiu, on veiem rutes amb paràmetres com `/project/:id` i rutes comodí `**` per a errors." |
| **1:15 - 2:00** | **Entitats i Formularis** | Mostra `src/app/models/project.ts` i `create.component.ts`. | "Per mantenir un esquema homogeni tant al client com al servidor, utilitzem l'entitat `Project`. Per a la captura de dades, he implementat **Reactive Forms** amb `FormGroup`, `FormControl` i `Validators` garantint una validació robusta abans d'enviar les dades." |
| **2:00 - 3:00** | **Serveis i Backend** | Mostra `src/app/services/project.service.ts` i `global.ts`. | "Tota la comunicació HTTP es centralitza en el `ProjectService`. Aquest servei injecta l'`HttpClient` per enviar peticions cap al nostre servidor local de Node.js que escolta al port 3700. Les peticions s'estructuren amb format JSON mitjançant capçaleres HTTP." |
| **3:00 - 4:30** | **Funcionament del CRUD** | Interactua amb la web (Crear, Llistar, Detall, Editar, Eliminar). | "El flux complet de dades funciona així: <br>1. **Crear:** Guardem el projecte (POST) i, si hi ha imatge, fem una segona crida per pujar el fitxer.<br>2. **Llistar:** En l'inici del component fem un GET de tots els projectes i els pintem dinàmicament amb un `*ngFor`.<br>3. **Detall i Eliminar:** Llegim l'ID de la URL, demanem un sol projecte, i tenim l'opció d'eliminar-lo (DELETE) amb un quadre de confirmació.<br>4. **Editar:** Carreguem les dades prèvies del projecte al formulari reactiu usant `patchValue` i enviem els canvis via PUT." |
| **4:30 - 5:00** | **Part Interessant i Comiat** | Mostra algun detall com la doble crida per imatges o l'estructura reactiva. | "La part més interessant de la implementació és com gestionem la pujada d'imatges vinculada a la creació, on primer s'assegura l'existència del projecte al servidor abans de rebre i associar el fitxer d'imatge. Moltes gràcies per la vostra atenció!" |

---

## 📦 2. Preparació de l'Arxiu ZIP d'Entrega
Per generar l'arxiu ZIP correctament **sense incloure la pesant carpeta `node_modules`** (tant de l'Angular com del Backend), pots seguir qualsevol d'aquests mètodes:

### Mètode A: Amb PowerShell (Més recomanat a Windows)
Obre PowerShell a la carpeta arrel del projecte i executa les següents comandes per crear una còpia neta temporal i empaquetar-la:
```powershell
# 1. Crea una carpeta temporal fora del projecte
mkdir "$env:TEMP\ProjecteEntrega"

# 2. Copia els fitxers excloent els directoris innecessaris
robocopy . "$env:TEMP\ProjecteEntrega" /MIR /XD node_modules .git dist .angular .vscode /XF Entrega.zip

# 3. Comprimeix-ho en un arxiu ZIP
Compress-Archive -Path "$env:TEMP\ProjecteEntrega\*" -DestinationPath ".\Entrega.zip" -Force

# 4. Elimina la carpeta temporal
Remove-Item -Recurse -Force "$env:TEMP\ProjecteEntrega"
```

### Mètode B: Compressió Manual
1. Obre l'explorador de fitxers de Windows.
2. Selecciona **tots els fitxers i carpetes de l'arrel** (`src`, `Backend25_26`, `package.json`, etc.) **excepte** la carpeta `node_modules`, `.git`, `.angular` i `dist`.
3. Fes clic dret, selecciona **Compressió / Envia a carpeta comprimida (ZIP)**.
4. Anomena el fitxer com a `Entrega.zip`.

---

## 🛠️ 3. Descripció dels Components Utilitzats
L'aplicació compta amb diversos components modulars integrats que proporcionen una experiència d'usuari SPA (Single Page Application):
1. **`AboutComponent`**: Pàgina de presentació de l'autor. Serveix com a pàgina de benvinguda.
2. **`ProjectsComponent`**: Pantalla principal de visualització on es llisten en forma de quadrícula dinàmica tots els projectes de la base de dades.
3. **`CreateComponent`**: Formulari per afegir nous projectes amb la possibilitat d'adjuntar imatges representatives.
4. **`DetailComponent`**: Pàgina dedicada a visualitzar en profunditat un projecte seleccionat, amb opció directa a editar o eliminar-lo.
5. **`EditComponent`**: Formulari reactiu que carrega la informació del projecte existent per permetre canvis de dades i d'imatge.
6. **`ContactComponent`**: Petita secció amb informació de contacte o formulari interactiu de correu.
7. **`ErrorComponent`**: Pàgina informativa de tipus "404 Not Found" en cas d'accedir a una ruta errònia.

---

## 🗺️ 4. Sistema de Routing (Enrutament)
L'enrutament està definit a `src/app/app.routes.ts`. S'importa `Routes` d'Angular per establir la correspondència entre les adreces URL i els nostres components:

```typescript
export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'create-project', component: CreateComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'project/:id', component: DetailComponent }, // Ruta amb paràmetre dinàmic
  { path: 'edit/:id', component: EditComponent },       // Ruta amb paràmetre dinàmic
  { path: '**', component: ErrorComponent }             // Ruta comodí per a errors 404
];
```

---

## 🗃️ 5. Entitats (Models)
L'entitat principal del frontend és el model `Project`, que manté l'estricta concordança amb el model de dades establert al backend. Es troba a `src/app/models/project.ts`:

```typescript
export class Project {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public category: string,
    public year: number,
    public langs: string,
    public image: string
  ) {}
}
```

---

## 📝 6. Gestió de Formularis (Reactive Forms)
Per a la recollida, manipulació i control de les dades hem triat **Formularis Reactius (Reactive Forms)** d'Angular.
* S'utilitzen classes com `FormGroup`, `FormControl`, i el servei `FormBuilder` (en l'edició) per dissenyar els formularis des del codi TypeScript.
* S'apliquen validacions estrictes mitjançant `Validators.required` per garantir que l'usuari no pugui enviar informació buida o errònia.
* Es controla l'estat del formulari (`projectForm.invalid`) per prevenir l'execució d'enviaments nuls, mostrant alertes en cas de decisió incorrecta.

---

## 📡 7. Implementació dels Serveis i Connexió Backend
El component `ProjectService` (`src/app/services/project.service.ts`) és l'únic responsable d'interaccionar amb el Backend mitjançant el mòdul `HttpClient`.

* **Configuració Global:** Utilitza un fitxer `global.ts` que centralitza l'adreça URL de l'API: `http://localhost:3700/api/`.
* **Capçaleres (Headers):** A les peticions GET, POST, PUT i DELETE s'aplica una capçalera de tipus `'Content-Type': 'application/json'` per tal d'assegurar un format homogeni en les trames de transmissió.
* **Pujada d'Imatges:** Per gestionar fitxers binaris com fotografies, s'utilitza la classe `FormData` en lloc de JSON a la crida `uploadImage()`.

---

## 🔄 8. Implementació del CRUD i Flux de Funcionament
A continuació s'explica com s'han dissenyat cadascuna de les accions principals:

### ➕ Crear Projecte (`CreateComponent`)
1. L'usuari emplena el formulari reactiu.
2. Es recopilen els camps en un nou objecte `Project`.
3. Es crida a `saveProject(newProject)` enviant una petició **POST** a la ruta `/save-project` del Backend.
4. **Flux Interessant de Doble Petició:**
   Si la base de dades rep i desa el text correctament, ens retorna el projecte creat amb la seva nova `_id`. Només si aquest procés ha estat satisfactori i l'usuari ha adjuntat un fitxer d'imatge, invoquem la funció `uploadImage(id, file)` que envia el fitxer binari de la imatge de manera independent i s'enllaça directament al registre desat al backend.

### 📋 Llistar Projectes (`ProjectsComponent`)
1. Al mètode de cicle de vida `ngOnInit()`, es crida a la funció del servei `getProjects()`.
2. Aquest fa una petició **GET** cap al backend a `/projects`.
3. Els projectes obtinguts es guarden en un array de tipus `Project[]`.
4. El codi HTML renderitza dinàmicament cadascun dels projectes usant Bootstrap i la directiva `*ngFor`.

### 🔍 Detall d'un Projecte (`DetailComponent`)
1. El component escolta els paràmetres actius de la ruta utilitzant `ActivatedRoute`.
2. S'extreu la `id` de la ruta mitjançant `this._route.params.subscribe()`.
3. Es fa una crida **GET** cap a `/project/:id`.
4. Si el projecte existeix, s'assigna a una propietat local i es renderitza amb detall a la pantalla. Si no existís, es redirigeix l'usuari a `/projects`.

### ✏️ Editar Projecte (`EditComponent`)
1. Es carrega la `id` del projecte de la ruta igual que al Detall.
2. Es demana el projecte amb `getProject(id)`.
3. **Ompliment reactiu:** Amb la funció `patchValue()` del formulari, s'omplen instantàniament els camps de text amb la informació obtinguda de la base de dades.
4. L'usuari realitza els canvis. Al fer clic a Enviar, s'invoca `updateProject(project)` enviant una petició **PUT** a la ruta `/project/:id`.
5. Si hi ha un fitxer d'imatge nou per modificar, es llança la petició de pujada exactament igual que a la Creació per actualitzar el binari.

### ❌ Eliminar Projecte (`DetailComponent`)
1. L'usuari fa clic al botó d'eliminar de la fitxa detall.
2. Es llança una confirmació del navegador (`confirm()`).
3. Si s'accepta, es crida al servei `deleteProject(id)` que executa una petició **DELETE** sobre la ruta `/project/:id`.
4. En respondre amb èxit, es fa una redirecció directa al llistat de projectes general, on s'observarà que el projecte ja no apareix.
