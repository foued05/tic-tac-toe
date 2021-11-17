let x: string = ''
let gagne: boolean = false
let ch_gagne = ""

function stateDisp(): string {

    if(!x){
        x = 'assets/img/portfolio/x.png'
        return x
    }else{
        
        if(x == 'assets/img/portfolio/x.png'){
            x = 'assets/img/portfolio/o.png'
            return x
        }else{
            x = 'assets/img/portfolio/x.png'
            return x
        }
    }

}

function initialState(): string[] {
        return [' ',' ',' ', ' ', ' ', ' ', ' ', ' ', ' ']
}

function stateEmptySlot(plateau: string[]): string[] {
    let slots: string[] = []
    plateau.map((value,index) =>{
        if(value == ' '){
            slots.push(index.toString())
        }
    })
    return slots
}

function stateDepth(t: string[]): string {
    let m: string[][] = [[], [], []] 
    let n = -1

    for (let k = 0 ; k < 3 ; k++){
        for (let l = 0 ; l < 3 ; l++){
            n++
            m[k][l] = t[n]
        }
    }

    for (let k = 0 ; k < 3 ; k++){

        if( (m[k][0] == m[k][1]) && (m[k][2] == m[k][1]) && (m[k][0]!=" "))
            return m[k][0]
        
        if( (m[0][k] == m[1][k]) && (m[2][k] == m[1][k]) && (m[0][k]!=" "))
            return m[0][k]
    } 
    
    if( (m[0][0] == m[1][1]) && (m[2][2] == m[1][1]) && (m[0][0]!=" "))
        return m[0][0]

    if( (m[0][2] == m[1][1]) && (m[1][1] == m[2][0]) && (m[2][0]!=" "))
        return m[2][0]

    return ""
}

function restart() {
    x = ''
    gagne = false
    ch_gagne = ""
    plateau = initialState()
    const all = document.querySelectorAll("img")
    all.forEach(val =>{
        val.setAttribute('src', 'assets/img/portfolio/nil.png')
    })
}

function jeu(p: string, i: number){

    let plateau_empty_slot: string[] = stateEmptySlot(plateau)
    let disp = ''

    plateau_empty_slot.map(ch =>{

        if(ch == i.toString()){
            
            const app = document.getElementById(p)
            disp = stateDisp()
            app?.setAttribute('src', disp)

            if(disp == 'assets/img/portfolio/x.png'){
                plateau[i] = "X"
            }else{
                plateau[i] = "O"
            }
        
            if(stateDepth(plateau)){
                
                if(!gagne){
                    ch_gagne = stateDepth(plateau)+" gagnant"
                    gagne = true
                }
                let  r = confirm(ch_gagne)
                if(r){
                    restart()
                }
            }

        }

    })

    

}

let plateau: string[] = initialState()