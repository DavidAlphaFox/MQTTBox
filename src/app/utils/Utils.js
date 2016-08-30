class Utils {

    static getLayoutsForGrid(cols,totalFormFields) { 
        var layouts = {};
        for(var key in cols) {
            var maxX = cols[key],y = 0, x = 0, layout = [];
            for(var i=1;i<=totalFormFields;i++) {
                if(x>=maxX) {x = 0; y++;}
                layout.push({i:'g_'+i, x: x, y: y, w: 1, h: 1});
                x++;
            }
            layouts[key] = layout;
        }
        return layouts;
    }

}

export default Utils;