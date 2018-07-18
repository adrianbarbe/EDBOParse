<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap fill-height>
            <v-flex xs12 md12>
                <v-card>
                    <v-card-title><span class="title">Parsing from EDBO</span></v-card-title>
                    <v-card-text>

                        <v-flex xs12 md12>
                            <v-select
                                    :items="universities"
                                    v-model="form.university"
                                    item-text="name"
                                    item-value="externalId"
                                    return-object
                                    label="Університет"
                            ></v-select>
                        </v-flex>


                        <div v-if="isConnected">
                            <v-chip color="green" text-color="white">Connected</v-chip>
                        </div>
                        <div v-for="cd in consoleData">{{cd}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="form.university !== null"
                               :disabled="isParsing"
                               @click="parseData"
                               large color="primary">Run parsing</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => {
            return {
                isConnected: false,
                consoleData: [],
                isParsing: false,
                universities: [],
                form: {
                    university: null,
                }
            };
        },
        mounted() {
            this.axios.get('/university')
                .then(response => {
                    this.universities = response.data.data;
                });
        },
        methods: {
            parseData() {
                this.consoleData = [];
                this.isParsing = true;

                this.axios.get(`/parse/${this.form.university.externalId}`)
                    .then(response => {
                        this.isParsing = false;
                    });
            }
        },
        sockets:{
            connect() {
                this.isConnected = true;
            },
            disconnect() {
                this.isConnected = false;
            },
            parseConsole(data) {
                this.consoleData.push(data.code);
            }
        }
    }
</script>
