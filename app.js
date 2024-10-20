require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || '3002';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const apiRouter = require('./routes');
const cors = require('cors');

// Autorise l'accès exterieur au serveur
app.use(cors());

//Parse des requetes en JSON
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API EXPRESS',
            version: '1.0.0'
        },
        servers: [{ url: 'api.cv.daniel-monteiro.fr' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer'
                }
            }
        },
        tags: [{ name: 'CV' }, { name: 'User' }, { name: 'Professions' }, { name: 'Educations' }, { name: 'Review' }],
        paths: {
            '/api/cv': {
                get: {
                    tags: ['CV'],
                    summary: 'Get All Cv',
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                },
                post: {
                    tags: ['CV'],
                    summary: 'Add Cv',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        visible: false,
                                        description: 'description'
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/{{cv-id}}': {
                get: {
                    tags: ['CV'],
                    summary: 'Get Cv By Id',
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/my-cv': {
                get: {
                    tags: ['CV'],
                    summary: 'Get User Cv',
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/{{cv-id}}': {
                put: {
                    tags: ['CV'],
                    summary: 'Update Cv',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        visible: true
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                },
                delete: {
                    tags: ['CV'],
                    summary: 'Delete Cv',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/auth/register': {
                post: {
                    tags: ['User'],
                    summary: 'Register',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        firstname: 'Daniel',
                                        lastname: 'MONTEIRO',
                                        email: 'test@test3.com',
                                        description: 'test',
                                        password: 'securePassword123'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/002/api/users/me': {
                get: {
                    tags: ['User'],
                    summary: 'User info',
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                },
                put: {
                    tags: ['User'],
                    summary: 'User Put',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        firstname: 'Daniel',
                                        description: 'test1'
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/002/api/auth/login': {
                post: {
                    tags: ['User'],
                    summary: 'Login',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        email: 'test@test4.com',
                                        password: 'securePassword123'
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/profession': {
                post: {
                    tags: ['Professions'],
                    summary: 'Add Cv Profession',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        cv: '',
                                        title: '<title>',
                                        company: '<company>'
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                },
                put: {
                    tags: ['Professions'],
                    summary: 'Put Cv Profession',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        cv: '',
                                        title: '<title>',
                                        company: '<company>'
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/profession/{{profession-id}}': {
                delete: {
                    tags: ['Professions'],
                    summary: 'Put Cv Profession',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/profession/{{profession-id}}': {
                get: {
                    tags: ['Professions'],
                    summary: 'Get professions',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/education': {
                post: {
                    tags: ['Educations'],
                    summary: 'Add Cv Education',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        cv: '',
                                        title: '<title>',
                                        company: '<company>'
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                },
                put: {
                    tags: ['Educations'],
                    summary: 'Put Cv Education',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        cv: '',
                                        title: '<title>',
                                        company: '<company>'
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/education/{{education-id}}': {
                delete: {
                    tags: ['Educations'],
                    summary: 'Put Cv Education',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/education/{{education-id}}': {
                get: {
                    tags: ['Educations'],
                    summary: 'Get Education',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/review': {
                post: {
                    tags: ['Review'],
                    summary: 'Add review',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        cv: '',
                                        rate: '<title>',
                                        description: '<company>'
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/review/{{review-id}}': {
                put: {
                    tags: ['Review'],
                    summary: 'Put review',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    example: {
                                        rate: 4
                                    }
                                }
                            }
                        }
                    },
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Review'],
                    summary: 'Delete Review',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            },
            '/api/cv/review/{{review-id}}': {
                get: {
                    tags: ['Review'],
                    summary: 'Get review by cv',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Successful response',
                            content: {
                                'application/json': {}
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//Connection BDD avec mongoose
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(`Database connection error ${error}`);
    });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Recuperation des definitions de routes
app.use('/api/', apiRouter);

//Lance le server sur le port renseigné
app.listen(port, () => {
    console.log('server is running');
});
