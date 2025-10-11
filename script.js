// Preenche anos e ano corrente no footer
(function(){
    const start=1995,end=new Date().getFullYear()+1;
    const years=[...Array(end-start+1)].map((_,i)=>start+i).reverse();
    const selMin=document.getElementById('anoMin');
    const selMax=document.getElementById('anoMax');
    years.forEach(y=>{const o1=document.createElement('option');o1.value=o1.textContent=y;selMin.appendChild(o1);const o2=document.createElement('option');o2.value=o2.textContent=y;selMax.appendChild(o2);});
    document.getElementById('year').textContent=new Date().getFullYear();
})();

// Estoque
const ESTOQUE=[
    { id:1, titulo:'millennium falcon', marca:'StarWars', ano:2010, km:42000, cambio:'Manual', preco:62900, img:'https://static.wikia.nocookie.net/starwars/images/a/ae/Landos_Millennium_Falcon.png/revision/latest?cb=20190613053952', combustivel:'Flex', cor:'Branco' },
    { id:2, titulo:'Maquina de Mistério', marca:'Outros', ano:1987, km:15000, cambio:'Manual', preco:88900, img:'https://static.wikia.nocookie.net/animeverso/images/c/ca/MM_Fantasma.webp/revision/latest/scale-to-width-down/550?cb=20241027003847&path-prefix=pt-br', combustivel:'Flex', cor:'Vermelho' },
    { id:3, titulo:'BatMovel', marca:'DC', ano:2020, km:40439, cambio:'Automático', preco:107900, img:'https://s2-autoesporte.glbimg.com/H-lhFgCZfWn6guPS4cLPYo6SVIc=/0x0:1980x1195/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2024/d/q/GRRTZcToyhmar43bpSMA/batmovel-tumbler-dianteira-estatica.jpg', combustivel:'Flex', cor:'Preto' },
    { id:4, titulo:'Impala família Winchester', marca:'Outros', ano:1967, km:60000, cambio:'Manual', preco:52900, img:'https://static.wikia.nocookie.net/starwars/images/a/ae/Landos_Millennium_Falcon.png/revision/latest?cb=20190613053952', combustivel:'Flex', cor:'Prato' },
    { id:5, titulo:'Estrela da Morte', marca:'StarWars', ano:2005, km:41238, cambio:'Automático', preco:113900, img:'https://preview.free3d.com/img/2023/08/3191688244982973459/63yen33g.jpg', combustivel:'Flex', cor:'Preto' },
    { id:6, titulo:'Carro hamburguer de siri', marca:'Outros', ano:2021, km:38000, cambio:'Automático', preco:129900, img:'https://static.wikia.nocookie.net/wikiesponja/images/2/2c/The_Wagon.png/revision/latest?cb=20150830151655&path-prefix=pt-br', combustivel:'Flex', cor:'Prata' },
    { id:7, titulo:'Blackbird X-men', marca:'Marvel', ano:2018, km:73000, cambio:'Automático', preco:67900, img:'https://fbi.cults3d.com/uploaders/42043548/illustration-file/c4385dbc-fec5-4f58-8ae7-1d122ffabcb4/blackbird-xmen-fortnite-1.png', combustivel:'Flex', cor:'Marrom' },
    { id:8, titulo:'Carro do Dick Vigarista', marca:'Outros', ano:2019, km:52000, cambio:'Automático', preco:89900, img:'https://i.redd.it/dick-dastardly-and-muttleys-car-v0-ig7rc34i3wke1.jpg?width=640&format=pjpg&auto=webp&s=9dd36c259b9fc8e07a8fce341386fe88c8af8224', combustivel:'Flex', cor:'Azul' },
    { id:9, titulo:'Avião Invisível', marca:'DC', ano:2019, km:105000, cambio:'Automático', preco:72900, img:'https://static.todamateria.com.br/upload/po/rq/por-que-o-ceu-e-azul-og.jpg?class=ogImageRectangle', combustivel:'Flex', cor:'Branco' }
];

let PAGE=1,PAGE_SIZE=8,filtered=[...ESTOQUE];
const grid=document.getElementById('grid');
const count=document.getElementById('resultsCount');
const loadMoreBtn=document.getElementById('loadMore');

function fmt(n){return n.toLocaleString('pt-BR',{minimumFractionDigits:0});}

function render(reset=false){
    if(reset){grid.innerHTML='';PAGE=1;}
    const slice=filtered.slice(0,PAGE*PAGE_SIZE);
    grid.innerHTML=slice.map(v=>`
    <div class=\"col-12 col-sm-6 col-lg-4\">
        <div class=\"card h-100 vehicle-card shadow-sm\">
        <img src=\"${v.img}\" class=\"card-img-top\" alt=\"${v.titulo}\">
        <div class=\"card-body d-flex flex-column\">
            <h3 class=\"h6 mb-1\">${v.titulo}</h3>
            <div class=\"vehicle-badges mb-2\">
            <span class=\"badge text-bg-light border\">${v.ano}</span>
            <span class=\"badge text-bg-light border\">${v.km.toLocaleString('pt-BR')} km</span>
            <span class=\"badge text-bg-light border\">${v.cambio}</span>
            </div>
            <div class=\"mt-auto d-flex align-items-center justify-content-between\">
            <strong class=\"fs-5\">R$ ${fmt(v.preco)}</strong>
            <div class=\"btn-group\">
                <button class=\"btn btn-outline-primary btn-sm\" onclick=\"verDetalhes(${v.id})\"><i class=\"bi bi-eye\"></i></button>
                <a class=\"btn btn-success btn-sm\" target=\"_blank\" href=\"https://wa.me/5575999999999?text=Tenho%20interesse%20no%20${encodeURIComponent(v.titulo)}%20(${v.ano})%20—%20R$%20${fmt(v.preco)}\"><i class=\"bi bi-whatsapp\"></i></a>
            </div>
            </div>
        </div>
        </div>
    </div>`).join('');
    count.textContent=filtered.length;
    loadMoreBtn.classList.toggle('d-none', filtered.length<=PAGE*PAGE_SIZE);
}

function applyFilters(){
    const q=(document.getElementById('q').value||'').trim().toLowerCase();
    const marca=document.getElementById('marca').value;
    const cambio=document.getElementById('cambio').value;
    const anoMin=+document.getElementById('anoMin').value||0;
    const anoMax=+document.getElementById('anoMax').value||9999;
    const precoMax=+document.getElementById('preco').value||300000;

    filtered=ESTOQUE.filter(v=>{
    const okQ=!q||`${v.titulo} ${v.marca}`.toLowerCase().includes(q);
    const okMarca=!marca||v.marca===marca;
    const okCambio=!cambio||v.cambio===cambio;
    const okAno=v.ano>=anoMin && v.ano<=anoMax;
    const okPreco=v.preco<=precoMax;
    return okQ&&okMarca&&okCambio&&okAno&&okPreco;
    });

    const sort=document.getElementById('sort').value;
    filtered.sort((a,b)=>{
    if(sort==='lower')return a.preco-b.preco;
    if(sort==='higher')return b.preco-a.preco;
    if(sort==='year')return b.ano-a.ano;
    return b.id-a.id;
    });

    render(true);
    document.getElementById('estoque').scrollIntoView({behavior:'smooth'});
}

// Detalhes
window.verDetalhes=function(id){
    const v=ESTOQUE.find(x=>x.id===id); if(!v)return;
    document.getElementById('detalhesTitulo').textContent=v.titulo+' · '+v.ano;
    document.getElementById('detalhesImg').src=v.img;
    document.getElementById('detalhesInfo').innerHTML=`
    <div class=\"d-flex flex-wrap gap-2 mb-2\">
        <span class=\"badge text-bg-light border\">${v.marca}</span>
        <span class=\"badge text-bg-light border\">${v.cambio}</span>
        <span class=\"badge text-bg-light border\">${v.combustivel}</span>
        <span class=\"badge text-bg-light border\">Cor ${v.cor}</span>
    </div>
    <ul class=\"list-unstyled small mb-3\">
        <li><i class=\"bi bi-speedometer\"></i> ${v.km.toLocaleString('pt-BR')} km</li>
        <li><i class=\"bi bi-calendar3\"></i> Ano ${v.ano}</li>
    </ul>
    <div class=\"fs-4 fw-bold mb-3\">R$ ${fmt(v.preco)}</div>`;
    document.getElementById('detalhesWhats').href=`https://wa.me/5575999999999?text=Tenho%20interesse%20no%20${encodeURIComponent(v.titulo)}%20(${v.ano})%20—%20R$%20${fmt(v.preco)}`;
    new bootstrap.Modal('#modalDetalhes').show();
}

// UI events
document.getElementById('preco').addEventListener('input',e=>{document.getElementById('precoOut').textContent=e.target.value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});});
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();applyFilters();});
document.getElementById('sort').addEventListener('change',applyFilters);
document.getElementById('loadMore').addEventListener('click',()=>{PAGE++;render();});

// Calculadora
function brl(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}    
function calcPMT(i,n,pv){if(i===0)return pv/n;return (i*pv)/(1-Math.pow(1+i,-n));}
function calcular(){
    const preco=+document.getElementById('precoVeiculo').value||0;
    const entrada=+document.getElementById('entrada').value||0;
    const taxaMes=(+document.getElementById('taxaMes').value||0)/100;
    const n=Math.max(1,(+document.getElementById('prazoMeses').value||1));
    const custos=+document.getElementById('custosMensais').value||0;
    const pv=Math.max(0,preco-entrada);
    const pmt=calcPMT(taxaMes,n,pv)+custos;
    const total=pmt*n;
    const juros=Math.max(0,total-custos*n-pv);
    document.getElementById('outParcela').textContent=brl(pmt);
    document.getElementById('outFinanciado').textContent=brl(pv);
    document.getElementById('outTotal').textContent=brl(total);
    document.getElementById('outJuros').textContent=brl(juros);
}
document.getElementById('calcForm').addEventListener('submit',e=>{e.preventDefault();calcular();});
document.querySelectorAll('#calcForm input').forEach(el=>el.addEventListener('input',calcular));
document.getElementById('btnLimpar').addEventListener('click',()=>{document.getElementById('precoVeiculo').value=90000;document.getElementById('entrada').value=20000;document.getElementById('taxaMes').value=1.69;document.getElementById('prazoMeses').value=48;document.getElementById('custosMensais').value=0;calcular();});

// Inicializações
applyFilters();
calcular();