import React from 'react';
import {FlatList, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

var REQUEST_XML_URL = 'http://b00blik.ru/tech/?feed=rss2';

const MOCK_DATA = [
    {
        status: 'ok',
        feed: {
            url: 'http://b00blik.ru/tech/?feed=rss2',
            title: 'tech',
            link: 'http://b00blik.ru/tech',
            author: '',
            description: 'Java and fun',
            image: '',
        },
        items: [
            {
                title: 'Test title one',
                pubDate: '2019-09-10 21:36:24',
                link: 'http://localhost/tech/?p=888',
                guid: 'http://localhost/tech/?p=888',
                author: 'b00blik',
                description: 'Test decsription one',
                thumbnail: '',
                enclosure: {},
                categories: [
                    'bash',
                    'csv',
                    'data',
                    'scripting',
                    'shell',
                ],
            },
            {
                title: 'Test title two',
                pubDate: '2019-09-10 21:36:24',
                link: 'http://localhost/tech/?p=999',
                guid: 'http://localhost/tech/?p=999',
                author: 'b00blik',
                description: 'Test decsription two',
                thumbnail: '',
                enclosure: {},
                categories: [
                    'bash',
                    'csv',
                    'data',
                    'scripting',
                    'shell',
                ],
            },
        ],
    },
];

function Item({id, title}) {
    return (
        <TouchableOpacity
            onPress={
                () => {
                    Linking.openURL(id);
                }}
            style={[
                styles.item
            ]}
        >
            <Text style={styles.titleStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articlesData: MOCK_DATA[0].items,
            loaded: false,
            title: '',
        };
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.articlesData}
                    renderItem={
                        ({item}) => (
                            <LinearGradient
                                colors={['#4c669f', '#3b5998', '#192f6a']}
                                style={styles.linearGradient}>
                                <Item
                                    id={item.link}
                                    title={item.title}>
                                </Item>
                            </LinearGradient>
                        )
                    }
                    keyExtractor={item => item.link}
                />
            </View>
        );
    }

    componentDidMount() {
        this.fetchData(REQUEST_XML_URL);
    }

    fetchData(URL) {
        const targetURL = 'https://api.rss2json.com/v1/api.json?rss_url=';

        fetch(targetURL + URL)
            .then(response => response.json())
            .then(responseData => {
                this.setState(
                    {
                        articlesData: responseData.items,
                        loaded: true,
                    },
                );
            })
            .done();
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>Loading Feed...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 62,
        borderStyle: 'solid',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        marginTop: 10,
        height: 70
    },
    titleStyle: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
});
