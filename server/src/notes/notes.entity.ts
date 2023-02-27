import {Column, DataType, Model, Table} from 'sequelize-typescript';

interface NoteCreationAttrs {
    queueNumber: number;
    color: string;
    date: string;
}

@Table({
    tableName: 'notes',
    timestamps: false,
})
export class Notes extends Model<Notes, NoteCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    header: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    text: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true
    })
    tags: string[];

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    queueNumber: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    color: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    date: string;
}