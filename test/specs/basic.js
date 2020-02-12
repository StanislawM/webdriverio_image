const expect = require('expect')
const path = require('path');

describe('Example', () => {
    beforeEach(() => {
    });

    function getAdressUri(link) {
        let slicePosition = link.indexOf('//');
        let uri = link.slice(slicePosition+2);
        return uri;
    }
    
    const projectMenu = [
        'http://videotuts.ru/all-tutorials-here/',
        'http://videotuts.ru/faq/photoshop.html',
    ];

    projectMenu.forEach((item) => {
        it(`Save a full page screens on page ${item}`, () => {
            const url = item;
            browser.url(url);
            const uri = getAdressUri(url);
            browser.pause(5000);
            browser.execute(() => {
                document.getElementsByTagName('html')[0].style.height = 'auto';
                document.getElementsByTagName('body')[0].style.height = 'auto';
                document.getElementsByTagName('body')[0].style.overflow = 'auto';
                document.getElementsByTagName('body')[0].style.background = 'blue !important';
            });
            browser.saveFullPageScreen(`${uri}`, {
                hideAfterFirstScroll: [
                    $('.pa-navbar'),
                ],
            });
        });
    });

    projectMenu.forEach((item) => {
        it(`Compare a full page screens on page ${item}`, () => {
            const url = item;
            browser.url(url);
            const uri = getAdressUri(url);
            browser.pause(5000);
            browser.execute(() => {
                document.getElementsByTagName('html')[0].style.height = 'auto';
                document.getElementsByTagName('body')[0].style.height = 'auto';
                document.getElementsByTagName('body')[0].style.overflow = 'auto';
            });
            expect(browser.checkFullPageScreen(`${uri}`, {
                hideAfterFirstScroll: [
                    $('.pa-navbar'),
                ],
            })).toEqual(0);
        });
    });

  });