import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface NoteCreationAttrs {
  queueNumber: number;
  color: string;
  date: string;
}

@Table({
  tableName: 'notes',
  timestamps: true,
  paranoid: true,
})
export class Notes extends Model<Notes, NoteCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  header: string;

  @Column({
    type: DataType.STRING(1500),
    allowNull: true,
    defaultValue: '',
  })
  text: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    defaultValue: [],
  })
  tags: string[];

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  queueNumber: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date: string;
}
