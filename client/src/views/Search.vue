<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap fill-height>
            <v-flex xs12 md12>
                <v-card>
                    <v-card-title><span class="title">Search from EDBO</span></v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs10>
                                <v-text-field
                                        @keyup.enter.native="search"
                                        v-model="form.name"
                                        label="Введіть ім'я або частину імені абітурієнта"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2>
                                <v-btn
                                        v-if="form.name !== ''"
                                        :disabled="loading"
                                        @click="search"
                                        large color="primary">Search
                                </v-btn>
                            </v-flex>
                        </v-layout>

                        <v-flex xs12>
                            <v-data-table
                                    :headers="headers"
                                    :items="results"
                                    hide-actions
                                    class="elevation-1"
                            >
                                <template slot="items" slot-scope="props">
                                    <td class="text-xs-left">{{ props.item.name }}</td>
                                    <td class="text-xs-left">{{ props.item.status }}</td>
                                    <td class="text-xs-left">{{ props.item.priority }}</td>
                                    <td class="text-xs-left">{{ props.item.points }}</td>
                                    <td class="text-xs-left">{{ props.item.olimp }}</td>
                                    <td class="text-xs-left">{{ props.item.coefficient }}</td>
                                    <td class="text-xs-left">
                                        <div v-for="subj in props.item.AbiturientSubjects">
                                            <v-tooltip top>
                                                <v-chip
                                                        slot="activator"
                                                        small
                                                        color="primary"
                                                        text-color="white"
                                                >{{subj.points}}
                                                </v-chip>
                                                {{subj.name}}
                                            </v-tooltip>
                                        </div>
                                    </td>
                                    <td class="text-xs-left">{{ props.item.University.name }}</td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => {
            return {
                form: {
                    name: '',
                },
                results: [],
                loading: false,
                headers: [
                    {text: "Ім'я", sortable: false, value: 'name'},
                    {text: "Статус", sortable: false, value: 'status'},
                    {text: "Пріоритет", sortable: false, value: 'priority'},
                    {text: "Бали", sortable: false, value: 'points'},
                    {text: "Олімп.", sortable: false, value: 'olimp'},
                    {text: "Коеф", sortable: false, value: 'coefficient'},
                    {text: "Предмети", sortable: false, value: 'AbiturientSubjects'},
                    {text: "Університет", sortable: false, value: 'University'},
                ],
            };
        },
        methods: {
            search() {
                this.loading = true;
                this.axios.get(`/abiturient?name=${this.form.name}`)
                    .then(response => {
                        this.loading = false;
                        this.results = response.data.data;
                    });
            }
        },
    }
</script>
