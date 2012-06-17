// main.js
// Brian Ford, btford@umich.edu
// Sharon Lee, sharlee@umich.edu
// 04/11/11

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
    regexp: true, plusplus: true, bitwise: true, browser: true, maxerr: 50,
    indent: 4 */
/*globals HTMLCanvasElement, $, $jit, json*/

var labelType, useGradients, nativeTextSupport, animate, icicle;

// Determine renderer
(function () {
    "use strict";
    var ua = navigator.userAgent,
        iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
        typeOfCanvas = typeof HTMLCanvasElement,
        nativeCanvasSupport = (typeOfCanvas === 'object' || typeOfCanvas === 'function'),
        textSupport = nativeCanvasSupport 
            && (typeof document.createElement('canvas').getContext('2d').fillText === 'function');
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
    nativeTextSupport = labelType === 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
}());


function init() {
    "use strict";
    icicle = new $jit.Icicle({
        injectInto: 'infovis',
        animate: animate,
        offset: 1,
        cushion: false,
        constrained: true,
        levelsToShow: 3,
        Tips: {
            enable: true,
            type: 'Native',
            offsetX: 20,
            offsetY: 20,
            onShow: function (tip, node) {
                // count children
                var count = 0;
                node.eachSubnode(function () {
                    count += 1;
                });
                
                if (node.name === "Music") {
                    tip.innerHTML = '<div class="tip-title">'
                        + '<b>' + node.name + '</b></div>';
                } else {
                    tip.innerHTML = '<div class="tip-title">'
                        + '<b>Name:</b> ' + node.name + '</div>'
                        + '<div class="tip-text">' + count + ' sub-genres</div>'
                        //+ '<div class="tip-text">' + node.data.artists + ' unique artists with songs in this genre</div>'
                        //+ '<div class="tip-text">' + node.data.familyArtists
                        //+ ' unique artists with songs in this genre, or any of this genre sub-genres</div>'
                        + '<div class="tip-text">' + node.data.avgRating + ' average rating</div>';
                }
            }
        },
        Events: {
            enable: true,
            onMouseEnter: function (node) {
                //add border and replot node
                node.setData('border', '#33dddd');
                icicle.fx.plotNode(node, icicle.canvas);
                icicle.labels.plotLabel(icicle.canvas, node, icicle.controller);
            },
            onMouseLeave: function (node) {
                node.removeData('border');
                icicle.fx.plot();
            },
            onClick: function (node) {
                if (node) {
                    //hide tips and selections
                    icicle.tips.hide();
                    if (icicle.events.hoveredNode) {
                        this.onMouseLeave(icicle.events.hoveredNode);
                    }
                    //perform the enter animation
                    icicle.enter(node);
                }
            },
            onRightClick: function () {
                //hide tips and selections
                icicle.tips.hide();
                if (icicle.events.hoveredNode) {
                    this.onMouseLeave(icicle.events.hoveredNode);
                }
                //perform the out animation
                icicle.out();
            }
        },
        Node: {
            overridable: true
        },
        Label: {
            type: labelType,
            size: 12
        },
        onCreateLabel: function (domElement, node) {
            domElement.innerHTML = node.name;
            var style = domElement.style;
            style.fontSize = '0.9em';
            style.display = '';
            style.cursor = 'pointer';
            style.color = '#333';
            style.overflow = 'hidden';
        },
        onPlaceLabel: function (domElement, node) {
            var style = domElement.style,
                width = node.getData('width'),
                height = node.getData('height');
            
            if (width < 7 || height < 7) {
                style.display = 'none';
            } else {
                style.display = '';
                style.width = width + 'px';
                style.height = height + 'px';
            }
        }
    });
    
    icicle.loadJSON(json);

    // Plot
    icicle.refresh();
}

function controls() {
    "use strict";
    var jit, gotoparent, select, levelsToShowSelect;
    
    jit = $jit;
    
    gotoparent = jit.id('update');
    
    jit.util.addEvent(gotoparent, 'click', function () {
        icicle.out();
    });
    
    select = jit.id('s-orientation');
    
    jit.util.addEvent(select, 'change', function () {
        icicle.layout.orientation = select[select.selectedIndex].value;
        icicle.refresh();
    });
    
    levelsToShowSelect = jit.id('i-levels-to-show');
    
    jit.util.addEvent(levelsToShowSelect, 'change', function () {
        var index = levelsToShowSelect.selectedIndex;
        if (index === 0) {
            icicle.config.constrained = false;
        } else {
            icicle.config.constrained = true;
            icicle.config.levelsToShow = index;
        }
        icicle.refresh();
    });
}
