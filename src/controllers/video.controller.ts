import {Body, Controller,Delete,Get, Param, Post, Put, Query, Req} from '@nestjs/common';
import { Request } from 'express';
import { VideosDataDto } from 'src/entities/dto/videos-data-dto';
import { VideosService } from 'src/services/videos.service';

@Controller('videos')
//@Param(key?:number)
export class VideosController{

    constructor(private readonly videoService: VideosService){}
    //+-------------------------------------------
    //| return code 201 and must return de id of 
    //| the registered data.
    //| access this end point with /v1/video
    //| 
    //+-------------------------------------------
    @Post()
    async create(@Body() videoDto: VideosDataDto){
        this.videoService.create(videoDto);
        return JSON.stringify(videoDto);
    }
    //+-------------------------------------------
    //| Must return a json with the list of videos
    //| data registered.
    //| access this end point with /v1/video
    //+-------------------------------------------
    @Get()
    async findAll():Promise<VideosDataDto[]>{
        return this.videoService.findAll();
    }
    //+-------------------------------------------
    //| must return only one json result
    //| access this end point with /v1/video/{id}
    //+-------------------------------------------
    @Get(':id')
    findOne(@Param('id') id:number){
        console.log(id);
        return this.videoService.findById(id);
    }
    //+-------------------------------------------
    //| update an registre and return 200 to ok
     //+-------------------------------------------
    @Put(':id')
    update(@Param('id') id: number,@Body() videoDto: VideosDataDto){
        this.videoService.update(id,videoDto);
    }

    //+-------------------------------------------
    //| delete an registre and return 200 to ok
    //|
    //+-------------------------------------------
    @Delete(':id')
    delete(@Param('id') id: number){
        let result={
            status:'',
            object: {}
        }
        result.object=this.videoService.findById(id);
        if(this.videoService.delete(id)){
            result.status = 'deleted';
            return result;
        };
        result.status=`The id:${id} couldn't be deleted.`;
        return result;
    }
}