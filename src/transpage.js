export const transpagePosition=(diff,pos)=>{
    let i=-1,p=0,p2=0;
    do {
        i++;
        const d=diff[i];
        if (d.removed) {
            p+=d.count;
        } else if (d.added) {
            p2+=d.count;
        } else {
            p+=d.count;
            p2+=d.count;
        }
    } while(p<pos)

    const delta=p-pos;
    return p2-delta;
}