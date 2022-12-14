import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../colors';
import { Button } from '../../components/Button';
import { useOptions } from '../../hooks/useOptions';
import { styles } from './style';
import CardFlip from 'react-native-card-flip';
import { Modal } from '../../components/Modal';
import { useTheme } from '../../hooks/useTheme';
import Images from '../../images'

export const Game = ({navigation}) => {

    const theme = useTheme().values
    const options = useOptions();

    // Getting card images from current theme
    const card_background = Images.themes[theme.name].card_background
    let cards = {}
    Images.themes[theme.name].cards.map(item => {
        const key = Images.themes[theme.name].cards.indexOf(item)
        cards = {...cards, [key+1]: item}
    })

    const [first, setFirst] = useState({
        number: 0,
    });
    const [second, setSecond] = useState({
        number: 0,
    });

    const [reset, setReset] = useState(false);
    const [render, setRender] = useState(false)

    const acertou_style = {
        opacity: 0,
    };

    const errou_style = {
        backgroundColor: COLORS.wrong,
    }

    const [erros, setErros] = useState(0)
    const [visible, setVisible] = useState(false)
    
    
    const items = useMemo(() => {
        let lista = [];
        const max = options.values.quantidade;
        const min = 1;
        
        const newRandom = () => {
            let number = Math.floor(Math.random() * (max / 2 - min + 1)) + min;
            let counter = 0;
            for (const item of lista) {
                if (item.number == number) {
                    counter++;
                }
            }
            if (counter == 2) {
                number = newRandom();
            }
            return number
        }

        for (let i = 0; i < max; i++) {

            const cartinha = {
                position: i,
                clicked: false,
                number: newRandom(),
            }

            lista.push(cartinha);
        }
        console.log(lista);
        return lista;
    }, [options.values.quantidade]);


    const clickCard = async (item, index) => {
        if (!index) {
            return false
        }
        item.clicked = true;
        if (first.number) {
            if (item.position == first.position) {
                return false
            }

            setSecond(item);
        } else {
            setFirst(item);
        }
    }

    useEffect(() => {
        if (second.number) {
            if (second.number == first.number) {
                console.log('acertou');
                setTimeout(() => {
                    first.style = acertou_style;
                    second.style = acertou_style;
                    setRender(!render)
                }, 1000)
                first.done = true;
                second.done = true;
                checkVictory();

            } else {
                console.log('errou');
                setErros(erros+1);
                
                setTimeout(() => {
                    second.card.flip();
                    first.card.flip();
                }, 1000)

                setTimeout(() => {
                    first.clicked = false;
                    second.clicked = false;
                })
            }
            console.log(first);
            setFirst({number: 0});
            setSecond({number: 0});
        }
    }, [second]);

    const goScore = useCallback(() => {
        setVisible(true)

    }, [erros])

    const checkVictory = async () => {
        const lista = items;
        for (let item of lista) {
            if (!item.done) {
                return false
            }
        }

        goScore();
        
    }

    return (
        <ImageBackground style={{flex: 1, justifyContent: 'flex-end'}} source={Images.background}>
            <Image style={styles.cloud_background} source={Images.themes[theme.name].cloud_background} resizeMode='stretch' />
            {/* <Text>{erros}</Text> */}
            <View style={styles.main_container}> 
                <View style={styles.body_container}>
                    {
                        items.map((item, index) => {
                            return (
                                // <View key={`${item.position}`} pointerEvents={item.done ? 'none' : 'auto'}>
                                //     <TouchableOpacity onPress={() => clickCard(item)} style={[styles.cartinha, item.style]} >
                                //         {/* <Text>{item.number}</Text> */}
                                //         <Image style={styles.cartinha} source={item.clicked ? cards[item.number] : card_background} />
                                //     </TouchableOpacity>
                                // </View>

                                <CardFlip onFlip={(index) => clickCard(item, index)} key={`${item.position}`} style={[styles.card_container, item.style]} ref={(card) => {item.card = card; return card}} >
                                    <TouchableOpacity style={styles.cartinha} onPress={() => item.card.flip()} > 
                                        <Image style={styles.cartinha} source={card_background} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cartinha} onPress={() => item.card.jiggle({ count: 2, duration: 100, progress: 0.05 })} > 
                                        <Image style={styles.cartinha} source={cards[item.number]} />
                                    </TouchableOpacity>
                                </CardFlip>
                            )
                        })
                    }
                </View>
                <View style={styles.bottom_container}>
                    <Button style={styles.bottom_buttons_style} onPress={() => navigation.goBack()} fontSize={40}>VOLTAR</Button>
                </View>
            </View>
            <Modal visible={visible} setVisible={setVisible} erros={erros} navigation={navigation} />
        </ImageBackground>
    )
}